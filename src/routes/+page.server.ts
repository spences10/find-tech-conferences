import { error } from '@sveltejs/kit';
import { format, subMonths } from 'date-fns';

export const load = async ({ locals, url }) => {
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

		const search_query = url.searchParams.get('search') || '';

		let filter = `approval_status = "approved" && start_date >= "${formatted_one_month_ago}"`;
		if (search_query) {
			filter += ` && (name ~ "${search_query}" || description ~ "${search_query}" || country ~ "${search_query}" || city ~ "${search_query}" || venue ~ "${search_query}")`;
		}

		const conferences = await locals.pb
			.collection('conferences')
			.getList(1, 50, {
				expand: 'tags',
				filter: filter,
				sort: '+start_date',
			});

		// Process conferences to include tag names
		const processed_conferences = conferences.items.map(
			(conference) => {
				const tag_names =
					conference.expand?.tags?.map((tag: any) => tag.tag_name) ||
					[];

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
