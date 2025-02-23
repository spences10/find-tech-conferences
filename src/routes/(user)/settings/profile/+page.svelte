<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components';
	import { Pencil } from '$lib/icons';
	import { get_pocketbase_image_url } from '$lib/utils';

	import type { SubmitFunction } from '@sveltejs/kit';

	const { form, data } = $props();

	let loading = $state(false);

	const handle_avatar_change = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			let src = URL.createObjectURL(file);
			let preview = document.getElementById(
				'avatar-preview',
			) as HTMLImageElement;
			preview.src = src;
		}
	};

	const update_profile: SubmitFunction = async () => {
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

<div class="">
	<h3 class="text-2xl font-medium">Update profile</h3>
	<div class="my-4 border-b border-base-300"></div>
	<form
		action="?/update_profile"
		method="POST"
		enctype="multipart/form-data"
		class="w-full max-w-2/3 pt-5"
		use:enhance={update_profile}
	>
		<fieldset class="w-full max-w-2/3">
			<label
				for="avatar"
				class="avatar w-32 rounded-full hover:cursor-pointer"
			>
				<label
					for="avatar"
					class="absolute right-3 bottom-3 hover:cursor-pointer"
				>
					<span class="btn btn-circle btn-secondary btn-sm">
						<Pencil />
					</span>
				</label>
				<div class="mb-4 w-32 rounded-full">
					<img
						src={data?.avatar
							? get_pocketbase_image_url(
									data?.collectionId,
									data?.id,
									data?.avatar,
								)
							: `https://ui-avatars.com/api/?name=${data?.name}`}
						alt="user avatar"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				onchange={handle_avatar_change}
				disabled={loading}
			/>
		</fieldset>
		<label for="bio" class="label pb-1 font-medium">
			<span class="label-text text-base">Bio</span>
		</label>
		<Input
			id="name"
			label="Name"
			placeholder="Enter your name"
			value={form?.data?.name ?? data?.name}
			disabled={loading}
			errors={form?.errors?.name}
		/>
		<div>
			<label for="bio" class="label pb-1 font-medium">
				<span class="label-text text-base">Bio</span>
			</label>
		</div>
		<textarea
			name="bio"
			class="textarea rounded-box border-secondary mt-0 h-24 w-full max-w-2/3 resize-none border border-dotted text-base shadow-lg"
			disabled={loading}
			value={form?.data?.bio ?? data?.bio}
		></textarea>
		{#if form?.errors?.bio}
			{#each form?.errors?.bio as error}
				<label for="bio" class="label">
					<span class="label-text-alt text-error">{error}</span>
				</label>
			{/each}
		{/if}
		<fieldset class="w-full max-w-2/3">
			<input
				type="submit"
				value="Update profile"
				class="btn btn-primary rounded-box mt-6 shadow-lg"
				disabled={loading}
			/>
		</fieldset>
	</form>
</div>
