<script lang="ts">
	import type { ConferencesResponse } from '$lib/types';
	import { get_pocketbase_image_url } from '$lib/utils';

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
		<pre>{JSON.stringify(conference, null, 2)}</pre>
		<img
			src={conference.image
				? get_pocketbase_image_url(
						conference.collectionId,
						conference.id,
						conference.image,
					)
				: `https://ui-avatars.com/api/?name=${conference.name}`}
			alt="User avatar"
		/>
		<div>
			<h2>{conference.name}</h2>
			{@html conference.description}
		</div>
	{/each}
{:else}
	<p>No conferences found.</p>
{/if}
