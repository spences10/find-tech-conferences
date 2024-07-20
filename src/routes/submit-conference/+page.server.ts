// import { db } from '$lib/server/database';
// import {
// 	conferences,
// 	insert_conference_schema,
// 	tags,
// } from '$lib/server/schema';
// import { error } from '@sveltejs/kit';
// import type { Action, Actions } from './$types';

// export const load = async () => {
// 	let all_tags
// 	try {
// 		all_tags = await db.select().from(tags);
// 	} catch (err) {
// 		console.log(`Error: ${err}`);
// 		return {
// 			status: 500,
// 			body: 'Something went wrong fetching contacts',
// 		};
// 	}
// 	return {
// 		all_tags,
// 	};
// };

// const submit_conference: Action = async ({ request }) => {
// 	const formData = Object.fromEntries(await request.formData());

// 	// Set approval_status to pending
// 	formData.approval_status = 'pending';

// 	// Validate using Drizzle-Zod schema
// 	const parsedData = insert_conference_schema.safeParse(formData);

// 	if (!parsedData.success) {
// 		// Handle validation errors
// 		console.error(parsedData.error);
// 		return {
// 			status: 400,
// 			body: parsedData.error,
// 		};
// 	}

// 	// If validation succeeds, insert into database
// 	try {
// 		await db.insert(conferences).values(parsedData.data);
// 	} catch (err) {
// 		console.log(`Error: ${err}`);
// 		error(500, 'Something went wrong submitting conference');
// 	}
// 	return {
// 		success: true,
// 	};
// };

// export const actions: Actions = { submit_conference };
