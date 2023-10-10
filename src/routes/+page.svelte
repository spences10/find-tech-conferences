<script lang="ts">
	import { ConferenceCard } from '$lib/components';

	export let data: { all_conferences: ConferenceData[] } = {
		all_conferences: [],
	};
	const { all_conferences } = data;
</script>

<div class="grid gap-11 md:grid-cols-2 lg:grid-cols-3">
	{#each all_conferences as conference (conference?.id)}
		<ConferenceCard {conference} />
	{/each}
</div>
