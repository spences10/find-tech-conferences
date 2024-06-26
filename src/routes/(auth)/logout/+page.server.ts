import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) redirect(302, '/');
	return {};
};

export const actions: Actions = {
	sign_in: async ({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		// basic check
		if (
			typeof username !== 'string' ||
			username.length < 1 ||
			username.length > 31
		) {
			return fail(400, {
				message: 'Invalid username',
			});
		}
		if (
			typeof password !== 'string' ||
			password.length < 1 ||
			password.length > 255
		) {
			return fail(400, {
				message: 'Invalid password',
			});
		}
		try {
			// find user by key
			// and validate password
			const user = await auth.useKey(
				'username',
				username.toLowerCase(),
				password,
			);
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' ||
					e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: 'Incorrect username of password',
				});
			}

			if (e) {
				console.log(e);
			}

			return fail(500, {
				message: 'An unknown error occurred',
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		redirect(302, '/');
	},
};
