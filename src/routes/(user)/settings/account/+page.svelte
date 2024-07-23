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
	let username: string = $state('');

	const submit_update_email: SubmitFunction = async () => {
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

	const submit_update_username: SubmitFunction = async () => {
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
		<h3 class="text-2xl font-medium">Change email</h3>
		<div class="divider"></div>
		<Input id="email" label="Email" value={data?.email} disabled />
		<form
			action="?/update_email"
			method="POST"
			class="space-y-2"
			use:enhance={submit_update_email}
		>
			<Input
				id="email"
				label="New email"
				type="email"
				required={true}
				value={form?.data?.email ?? ''}
				disabled={loading}
				errors={form?.errors?.email}
			/>
			<button
				type="submit"
				class="btn btn-primary rounded-box shadow-lg"
				disabled={loading}
			>
				Confirm
			</button>
		</form>
	</div>
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change username</h3>
		<div class="divider"></div>
		<Input
			id="username"
			label="Username"
			value={data?.username}
			disabled
		/>
		<form
			action="?/update_username"
			method="POST"
			class="space-y-2"
			use:enhance={submit_update_username}
		>
			<Input
				id="username"
				label="New username"
				required={true}
				value={username}
				disabled={loading}
				errors={form?.errors?.username}
			/>
			<button
				type="submit"
				class="btn btn-primary rounded-box shadow-lg"
				disabled={loading}
			>
				Confirm
			</button>
		</form>
	</div>
</div>
