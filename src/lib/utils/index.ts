import { PUBLIC_DATABASE_URL } from '$env/static/public';

import type { z } from 'zod';

export const get_pocketbase_image_url = (
	collection: string,
	record_id: string,
	file_name: string | undefined,
	size = '0x0',
) => {
	return `${PUBLIC_DATABASE_URL}/api/files/${collection}/${record_id}/${file_name}?thumb=${size}`;
};

export const validate_data = async (
	form_data: FormData,
	schema: z.Schema,
) => {
	const body = Object.fromEntries(form_data);

	try {
		const data = schema.parse(body);
		return {
			form_data: data,
			errors: null,
		};
	} catch (err) {
		console.error(`Error validating form data: ${err}`);
		const errors = (err as z.ZodError).flatten();
		return {
			form_data: body,
			errors,
		};
	}
};
