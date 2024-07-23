import type { ConferencesResponse } from './pocketbase-types';

export type ConferenceWithTagNames = ConferencesResponse & {
	tag_names: string[];
};
