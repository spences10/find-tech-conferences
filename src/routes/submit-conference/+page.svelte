<script lang="ts">
	import { enhance } from '$app/forms';
	import { FormInput } from '$lib/components';

	export let data: { all_tags?: TagsData[] };
	const { all_tags } = data;
</script>

<form
	method="POST"
	action="?/submit_conference"
	use:enhance={() => {
		return ({ update, result }) => {
			console.log('=====================');
			console.log(result);
			console.log('=====================');
			update({ reset: false });
		};
	}}
	class="form-control bg-base-300 shadow-md rounded-box p-6 w-full"
>
	<FormInput label="Conference Name" type="text" id="name" required />

	<label for="description" class="label font-medium pb-1">
		<span class="label-text text-base"> Description: </span>
	</label>
	<textarea
		id="description"
		name="description"
		class="textarea mb-2"
	/>

	{#if all_tags}
		<label for="tags" class="label font-medium pb-1">
			<span class="label-text text-base"> Tags: </span>
		</label>
		<select name="tags" id="tags" class="select">
			{#each all_tags as { tag_name, id } (id)}
				<option value={id}>{tag_name}</option>
			{/each}
		</select>
	{/if}

	<FormInput
		label="Start Date:"
		type="date"
		id="start_date"
		required
	/>

	<FormInput label="End Date:" type="date" id="end_date" required />

	<FormInput label="Location:" type="text" id="location" required />

	<FormInput
		label="Website URL:"
		type="url"
		id="website_url"
		required
	/>

	<FormInput
		label="CFP Start Date:"
		type="date"
		id="cfp_start_date"
	/>

	<FormInput label="CFP End Date:" type="date" id="cfp_end_date" />

	<input
		type="submit"
		value="Submit Conference"
		class="btn btn-secondary mt-10"
	/>
</form>
