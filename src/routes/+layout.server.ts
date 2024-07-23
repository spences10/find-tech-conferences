export const load = ({ locals }) => {
	if (locals.user) {
		return locals.user;
	}

	return {
		user: undefined,
	};
};
