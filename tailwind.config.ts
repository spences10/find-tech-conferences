import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
	},

	daisyui: {
		themes: ['synthwave'],
	},

	plugins: [typography, daisyui],
} as Config;
