import { error, redirect } from '@sveltejs/kit';

import type { ClientResponseError } from 'pocketbase';
import type { Action, Actions } from './$types';

const update_password: Action = async ({ request, locals }) => {
	const data = Object.fromEntries(await request.formData());

	try {
		await locals.pb.collection('users').update(locals.user.id, data);
		locals.pb.authStore.clear();
	} catch (err) {
		console.error(`Error: ${err}`);
		const e = err as ClientResponseError;
		error(e.status, e.data.message);
	}

	redirect(303, '/login');
};

export const actions: Actions = { update_password };
