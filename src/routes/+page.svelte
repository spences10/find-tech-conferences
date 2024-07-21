<script lang="ts">
	import { ConferenceCard } from '$lib/components';
	import type { ConferencesResponse } from '$lib/types';

	interface Props {
		data: {
			conferences: ConferencesResponse[];
		};
	}

	let { data }: Props = $props();
	let show_descriptions = $state(false);
</script>

<h1>Conferences</h1>

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
	{#if data.conferences.length > 0}
		{#each data.conferences as conference}
			<div class="h-full">
				<ConferenceCard
					{conference}
					is_expanded={show_descriptions}
				/>
			</div>
		{/each}
	{:else}
		<p>No conferences found.</p>
	{/if}
</div>
