<script lang="ts">
	import { goto } from '$app/navigation';
	import { ConferenceCard } from '$lib/components';
	import { MagnifyingGlass } from '$lib/icons';

	import type { ConferencesResponse } from '$lib/types';

	interface Props {
		data: {
			conferences: ConferencesResponse[];
		};
	}

	let { data }: Props = $props();
	let show_descriptions = $state(false);
	let search_query = $state('');

	let filtered_conferences = $derived(
		data.conferences.filter((conference) =>
			conference.name
				.toLowerCase()
				.includes(search_query.toLowerCase()),
		),
	);

	const handle_search = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			// Trigger server-side search
			goto(`?search=${encodeURIComponent(search_query)}`);
		}
	};
</script>

<h1 class="my-6 text-4xl font-bold tracking-widest">
	Find Tech Conferences
</h1>

<label
	class="input input-bordered mb-4 flex items-center gap-2 rounded-box"
>
	<input
		type="text"
		class="grow"
		placeholder="Search"
		bind:value={search_query}
		onkeydown={handle_search}
	/>
	<MagnifyingGlass />
</label>

<div class="mb-4 flex items-center gap-2">
	<label for="toggle-descriptions" class="cursor-pointer">
		Show Descriptions
	</label>
	<input
		id="toggle-descriptions"
		type="checkbox"
		class="toggle toggle-accent"
		bind:checked={show_descriptions}
	/>
</div>

<div class="grid grid-cols-1 gap-10 lg:grid-cols-2 2xl:grid-cols-3">
	{#if filtered_conferences.length > 0}
		{#each filtered_conferences as conference}
			<div class="h-full">
				<ConferenceCard
					{conference}
					is_expanded={show_descriptions}
				/>
			</div>
		{/each}
	{:else}
		<h3 class="text-bold text-center text-5xl">
			No, that's a big nothing 😲
		</h3>
	{/if}
</div>
