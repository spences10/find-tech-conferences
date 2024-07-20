import { PUBLIC_DATABASE_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PUBLIC_DATABASE_URL);

	const cookie = event.request.headers.get('cookie') ?? '';
	event.locals.pb.authStore.loadFromCookie(cookie);

	if (event.locals.pb.authStore.isValid) {
		try {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = event.locals.pb.authStore.model;
		} catch {
			event.locals.pb.authStore.clear();
			event.locals.user = undefined;
		}
	}

	const response = await resolve(event);
	response.headers.set(
		'Set-Cookie',
		event.locals.pb.authStore.exportToCookie({ secure: true }),
	);
	return response;
};
