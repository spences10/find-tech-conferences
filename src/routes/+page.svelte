<script lang="ts">
	import { ConferenceCard } from '$lib/components';

	export let data: { all_conferences: ConferenceData[] } = {
		all_conferences: [],
	};
	const { all_conferences } = data;
</script>

{#each all_conferences as conference (conference?.id)}
	<ConferenceCard {conference} />
{/each}

<pre>{JSON.stringify(data, null, 2)}</pre>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
	documentation
</p>
