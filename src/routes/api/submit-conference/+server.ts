import {
	GITHUB_SECRET,
	GITHUB_TOKEN,
	QUEUE_ADMIN_ID,
} from '$env/static/private';
import { json } from '@sveltejs/kit';

// TODO: Placeholder

export const POST = async ({ request, locals }) => {
	// Ensure the request is authenticated
	const auth_header = request.headers.get('Authorization');
	if (!auth_header || auth_header !== `Bearer ${GITHUB_SECRET}`) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const issue_data = await request.json();

		// Parse issue content
		const conference_data = parse_issue_body(issue_data.issue.body);

		// Submit to PocketBase
		const new_conference = await locals.pb
			.collection('conferences')
			.create({
				...conference_data,
				approval_status: 'pending',
				owner: QUEUE_ADMIN_ID,
			});

		// Close the GitHub issue
		await fetch(issue_data.issue.comments_url, {
			method: 'POST',
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
				Accept: 'application/vnd.github.v3+json',
			},
			body: JSON.stringify({
				body: 'Thank you for your submission. The conference has been added to our database and is pending approval.',
			}),
		});

		await fetch(issue_data.issue.url, {
			method: 'PATCH',
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
				Accept: 'application/vnd.github.v3+json',
			},
			body: JSON.stringify({
				state: 'closed',
			}),
		});

		return json({
			message: 'Conference submitted successfully',
			id: new_conference.id,
		});
	} catch (error) {
		console.error('Error processing submission:', error);
		return json(
			{ error: 'Failed to process submission' },
			{ status: 500 },
		);
	}
};

function parse_issue_body(body: string) {
	const lines = body.split('\n');
	const data: Record<string, string> = {};

	lines.forEach((line) => {
		const match = line.match(/### (.+)\n(.+)/);
		if (match) {
			const [, key, value] = match;
			data[key.toLowerCase().replace(/ /g, '_')] = value.trim();
		}
	});

	return {
		name: data.conference_name,
		description: data.description,
		start_date: data.start_date,
		end_date: data.end_date,
		country: data.country,
		city: data.city,
		venue: data.venue,
		website_url: data.website_url,
		cfp_start_date: data.call_for_papers_cfp_start_date,
		cfp_end_date: data.call_for_papers_cfp_end_date,
		image: data.conference_image_url,
		tags: data.tags.split(',').map((tag) => tag.trim()),
	};
}
