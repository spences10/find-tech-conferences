<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';

	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';

	interface Props {
		form: ActionData;
		data: PageData;
	}

	let { form, data }: Props = $props();
	let loading: boolean = $state(false);

	const submit_update_password: SubmitFunction = async () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="space-y-12">
	<div class="w-full">
		<form
			action="?/update_password"
			method="POST"
			use:enhance={submit_update_password}
		>
			<h3 class="text-2xl font-medium">Change password</h3>
			<div class="my-4 border-b border-base-300"></div>
			<Input
				id="oldPassword"
				label="Old password"
				type="password"
				required
			/>
			<Input
				id="password"
				label="New password"
				type="password"
				required
			/>
			<Input
				id="passwordConfirm"
				label="Confirm new password"
				type="password"
				required
			/>
			<a href="/reset" class="text-primary text-sm">
				Forgot password?
			</a>
			<button
				type="submit"
				class="btn btn-primary rounded-box mt-4 block shadow-lg"
				disabled={loading}
			>
				Confirm
			</button>
		</form>
	</div>
</div>
