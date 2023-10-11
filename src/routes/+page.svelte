<script lang="ts">
	import { ConferenceCard } from '$lib/components';

	export let data: { all_conferences: ConferenceData[] } = {
		all_conferences: [],
	};
	const { all_conferences } = data;

	let search_query = '';
	$: filtered_conferences = all_conferences.filter(
		(conference: ConferenceData) => {
			if (search_query === '') return true;

			return (
				conference.name
					.toLowerCase()
					.indexOf(search_query.toLowerCase()) !== -1 ||
				conference.description?.toLowerCase() ===
					search_query.toLowerCase() ||
				conference.location
					.toLowerCase()
					.indexOf(search_query.toLowerCase()) !== -1
			);
		},
	);
</script>

<div class="mb-10 form-control">
	<label for="search" class="label">
		<span class="label-text">
			Search name, description, or location
		</span>
	</label>
	<input
		id="search"
		class="input input-primary input-bordered"
		type="text"
		placeholder="Search..."
		bind:value={search_query}
	/>
</div>

<div class="grid gap-11 md:grid-cols-2 lg:grid-cols-3">
	{#each filtered_conferences as conference (conference?.id)}
		<ConferenceCard {conference} />
	{/each}
</div>
