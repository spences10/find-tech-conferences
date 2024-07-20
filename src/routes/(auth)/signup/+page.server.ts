import { register_user_schema } from '$lib/schemas';
import { validate_data } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';

import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { form_data, errors } = await validate_data(
			await request.formData(),
			register_user_schema,
		);

		if (errors) {
			return fail(400, {
				data: form_data,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb.collection('users').create({ ...form_data });
			await locals.pb
				.collection('users')
				.requestVerification(form_data.email as string);
		} catch (err) {
			console.error(err);
			error(500, 'something went wrong');
		}

		redirect(303, '/login');
	},
};
