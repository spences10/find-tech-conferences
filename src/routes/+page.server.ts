import { error } from '@sveltejs/kit';
import { format, subMonths } from 'date-fns';

export const load = async ({ locals }) => {
	if (!locals.pb) {
		error(500, 'Database connection not available');
	}

	try {
		const current_date = new Date();
		const one_month_ago = subMonths(current_date, 1);
		const formatted_one_month_ago = format(
			one_month_ago,
			"yyyy-MM-dd'T'HH:mm:ss'Z'",
		);

		const conferences = await locals.pb
			.collection('conferences')
			.getList(1, 50, {
				expand: 'tags',
				filter: `approval_status = "approved" && start_date >= "${formatted_one_month_ago}"`,
				sort: '+start_date',
			});

		const tags = await locals.pb
			.collection('tags')
			.getFullList({ fields: 'id,tag_name' });

		// Create a map of tag IDs to tag names
		const tag_map = new Map(
			tags.map((tag) => [tag.id, tag.tag_name]),
		);

		// Process conferences to include tag names
		const processed_conferences = conferences.items.map(
			(conference) => {
				const tag_ids = conference.expand?.tags?.tags || [];
				const tag_names = tag_ids.map(
					(id: string) => tag_map.get(id) || 'Unknown Tag',
				);

				return {
					...conference,
					tag_names,
				};
			},
		);

		return { conferences: processed_conferences };
	} catch (err) {
		console.error('Error fetching conferences:', err);
		error(500, 'Failed to fetch conferences');
	}
};
