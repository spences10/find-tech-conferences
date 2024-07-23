import { error } from '@sveltejs/kit';

import type { ClientResponseError } from 'pocketbase';
import type { Action, Actions } from './$types';

const update_email: Action = async ({ request, locals }) => {
	const data = Object.fromEntries(await request.formData());

	try {
		await locals.pb
			.collection('users')
			.requestEmailChange(data?.email.toString());
	} catch (err) {
		console.error(`Error: ${err}`);
		const e = err as ClientResponseError;
		error(e.status, e.data.message);
	}

	// user to log in again after email change
	locals.pb.authStore.clear();
	locals.user = undefined;

	return {
		success: true,
		// data,
		// status: 303,
		// headers: { Location: '/' },
	};
};

const update_username: Action = async ({ request, locals }) => {
	const data = Object.fromEntries(await request.formData());

	try {
		await locals.pb
			.collection('users')
			.getFirstListItem(`username = "${data?.username}"`);
	} catch (err) {
		const e = err as ClientResponseError;
		if (e.status === 404) {
			try {
				let { username } = await locals.pb
					.collection('users')
					.update(locals.user.id, { username: data?.username });
				locals.user.username = username;
				return {
					success: true,
					data: { username },
				};
			} catch (err) {
				console.error(`Error: ${err}`);
				error(e.status, e.data.message);
			}
		}
		console.error(`Error: ${err}`);
		error(e.status, e.data.message);
	}

	return {
		success: true,
		// data,
	};
};

export const actions: Actions = { update_email, update_username };
