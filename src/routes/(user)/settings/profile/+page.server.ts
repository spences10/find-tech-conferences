import { error, redirect } from '@sveltejs/kit';

import type { Action, Actions } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
};

const update_profile: Action = async ({ locals, request }) => {
	let data = await request.formData();
	let user_avatar = data.get('avatar') as Blob;

	if (user_avatar.size === 0) {
		data.delete('avatar');
	}

	try {
		let { name, avatar, bio } = await locals.pb
			.collection('users')
			.update(locals?.user?.id, data);
		locals.user.name = name;
		locals.user.avatar = avatar;
		locals.user.bio = bio;
	} catch (err) {
		console.error(`Error: ${err}`);
		error(500, 'Something went wrong updating profile');
	}
	return {
		success: true,
	};
};

export const actions: Actions = { update_profile };
