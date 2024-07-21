<script lang="ts">
	import { Calender, MapPin, OfficeBuilding } from '$lib/icons';
	import { get_pocketbase_image_url } from '$lib/utils';

	import type { ConferencesResponse } from '$lib/types';

	interface Props {
		conference: ConferencesResponse & {
			tag_names?: string[];
		};
	}

	let { conference }: Props = $props();
</script>

<section
	class="mb-20 overflow-hidden rounded-box bg-primary shadow-xl"
>
	<div class="relative h-48 w-full">
		<img
			src={conference.image
				? get_pocketbase_image_url(
						conference.collectionId,
						conference.id,
						conference.image,
					)
				: `https://ui-avatars.com/api/?name=${conference.name}`}
			alt="{conference.name} banner"
			class="h-full w-full object-cover"
		/>
	</div>
	<article class="p-6 text-primary-content">
		<header>
			<h3
				class="mb-4 text-2xl font-semibold leading-none tracking-tight"
			>
				{conference.name}
			</h3>
		</header>
		<div
			class="text-muted-foreground mt-2 flex items-center gap-2 text-sm text-base-content/60"
		>
			<Calender />
			<p>
				<span class="font-bold">
					{new Date(conference.start_date).toDateString()}
				</span>
			</p>
		</div>
		<div
			class="text-muted-foreground mt-2 flex items-center gap-2 text-sm text-base-content/60"
		>
			<MapPin />
			<p>
				<span class="font-bold">
					{conference.city}, {conference.country}
				</span>
			</p>
		</div>
		<div
			class="mb-6 mt-2 flex items-center gap-2 text-sm text-base-content/60"
		>
			<OfficeBuilding />
			<p>
				<span class="font-bold">{conference.venue}</span>
			</p>
		</div>
		<div class="prose">{@html conference.description}</div>
		<div class="mt-4 flex flex-wrap gap-2">
			{#if conference.tag_names}
				{#each conference.tag_names as tag}
					<span class="badge badge-secondary">
						{tag}
					</span>
				{/each}
			{/if}
		</div>
		<a
			href={conference.website_url}
			rel="noopener noreferrer"
			target="_blank"
			class="btn btn-secondary mt-6"
		>
			Learn more
		</a>
	</article>
</section>
