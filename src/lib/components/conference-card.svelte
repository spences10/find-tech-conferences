<script lang="ts">
	import { Calender, MapPin, OfficeBuilding } from '$lib/icons';
	import { get_pocketbase_image_url } from '$lib/utils';
	import { format, isPast, parseISO } from 'date-fns';
	import { slide } from 'svelte/transition';

	import type { ConferenceWithTagNames } from '$lib/types';

	interface Props {
		conference: ConferenceWithTagNames;
		is_expanded?: boolean;
	}

	let { conference, is_expanded = false }: Props = $props();

	let conference_date = parseISO(conference.start_date);
	let formatted_date = format(conference_date, 'MMMM d, yyyy');
	let is_expired = isPast(conference_date);
</script>

<section
	class="flex h-full flex-col overflow-hidden rounded-box bg-primary shadow-xl"
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
	<article class="flex flex-grow flex-col p-6 text-primary-content">
		<header>
			<h3
				class="mb-4 text-2xl font-semibold leading-none tracking-tight"
			>
				{conference.name}
			</h3>
		</header>
		<div
			class="text-muted-foreground mt-2 flex items-center gap-2 text-sm text-base-content/60"
			class:text-warning={is_expired}
		>
			<Calender />
			<p>
				<span class="font-bold">
					{#if is_expired}
						<span class="tooltip" data-tip="Event ended now">
							{formatted_date}
						</span>
					{:else}
						{formatted_date}
					{/if}
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
			class="mb-4 mt-2 flex items-center gap-2 text-sm text-base-content/60"
		>
			<OfficeBuilding />
			<p>
				<span class="font-bold">{conference.venue}</span>
			</p>
		</div>
		{#if is_expanded}
			<div
				class="prose mb-2 flex-grow"
				transition:slide={{ duration: 300 }}
			>
				{@html conference.description}
			</div>
		{/if}
		<div class="mt-auto">
			<div class="mb-4 flex flex-wrap gap-2">
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
				class="btn btn-info w-full"
			>
				Learn more
			</a>
		</div>
	</article>
</section>
