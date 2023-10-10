import { db } from '$lib/server/database';
import { conferences } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
	let all_conferences;
	try {
		all_conferences = await db
			.select()
			.from(conferences)
			.where(eq(conferences.approval_status, 'Approved'));
	} catch (err) {
		console.log(`Error: ${err}`);
		return {
			status: 500,
			body: 'Something went wrong fetching contacts',
		};
	}
	return {
		all_conferences,
	};
};
