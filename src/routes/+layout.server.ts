import { PUBLIC_DATABASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const load = async ({ locals }) => {
	if (!locals.pb) {
		locals.pb = new PocketBase(PUBLIC_DATABASE_URL);
	}

	return {
		user: locals.pb.authStore.model
	};
};
