<script lang="ts">
	import { ConferenceCard } from '$lib/components';
	import type { ConferencesResponse } from '$lib/types';

	interface Props {
		data: {
			conferences: ConferencesResponse[];
		};
	}

	let { data }: Props = $props();
</script>

<h1>Conferences</h1>

{#if data.conferences.length > 0}
	{#each data.conferences as conference}
		<ConferenceCard {conference} />
	{/each}
{:else}
	<p>No conferences found.</p>
{/if}
