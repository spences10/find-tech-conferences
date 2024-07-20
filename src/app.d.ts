// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type Pocketbase from 'pocketbase';
import type { User } from 'pocketbase';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase;
			user: User | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
