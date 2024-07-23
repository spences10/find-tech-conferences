<script lang="ts">
	import { goto } from '$app/navigation';
	import { ConferenceCard } from '$lib/components';
	import { MagnifyingGlass } from '$lib/icons';

	import type { ConferenceWithTagNames } from '$lib/types';

	interface Props {
		data: {
			conferences: ConferenceWithTagNames[];
		};
	}

	let { data }: Props = $props();
	let is_expanded = $state(false);
	let search_query = $state('');
	let search_input: HTMLInputElement;

	let filtered_conferences = $derived(
		data.conferences.filter((conference) =>
			[
				conference.name,
				conference.description,
				conference.country,
				conference.city,
				conference.venue,
				...conference.tag_names,
			]
				.join(' ')
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

	const handle_search_input = async () => {
		if (search_query === '') {
			// Reset the search when the search term is deleted
			await goto('?', { replaceState: true });
			// Ensure the input retains focus after the page updates
			setTimeout(() => {
				search_input.focus();
				search_input.setSelectionRange(0, 0);
			}, 0);
		}
	};
</script>

<h1 class="mt-6 text-4xl font-bold tracking-widest">
	Find Tech Conferences
</h1>
<p class="mb-8 text-secondary">
	Discover, Submit, Connect: The Community-Driven Tech Conference
	Directory
</p>

<label
	class="input input-bordered mb-14 flex items-center gap-2 rounded-box"
>
	<input
		type="text"
		class="grow"
		placeholder="Search conferences, locations, or tags"
		bind:value={search_query}
		bind:this={search_input}
		onkeydown={handle_search}
		oninput={handle_search_input}
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
		bind:checked={is_expanded}
	/>
</div>

<div class="grid grid-cols-1 gap-10 lg:grid-cols-2 2xl:grid-cols-3">
	{#if filtered_conferences.length > 0}
		{#each filtered_conferences as conference}
			<div class="h-full">
				<ConferenceCard {conference} {is_expanded} />
			</div>
		{/each}
	{:else}
		<h3 class="text-bold text-center text-5xl">
			No, that's a big nothing 😲
		</h3>
	{/if}
</div>
