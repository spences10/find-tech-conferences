import { db } from '$lib/server/database';
import {
	conferences,
	insert_conference_schema,
} from '$lib/server/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let all_conferences: ConferenceData[] = [];
	try {
		all_conferences = await db
			.select()
			.from(conferences)
			.where(eq(conferences.approval_status, 'approved'));
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
