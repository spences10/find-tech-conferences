import { login_user_schema } from '$lib/schemas';
import { validate_data } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';

import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { form_data, errors } = await validate_data(
			await request.formData(),
			login_user_schema,
		);

		if (errors) {
			return fail(400, {
				data: form_data,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb
				.collection('users')
				.authWithPassword(
					form_data.email as string,
					form_data.password as string,
				);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true,
				};
			}
		} catch (err) {
			console.error(err);
			error(500, 'something went wrong');
		}

		redirect(303, '/');
	},
};
