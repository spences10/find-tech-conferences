<script lang="ts">
	import { get_pocketbase_image_url } from '$lib/utils';

	import type { ConferencesResponse } from '$lib/types';

	interface Props {
		conference: ConferencesResponse;
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
			<h2 class="text-3xl font-bold tracking-wide">
				{conference.name}
			</h2>
		</header>
		<p class="mt-2">
			<span class="text-neutral-content">Date:</span>
			<span class="font-bold">{conference.start_date}</span>
		</p>
		<p class="mt-2">
			<span class="text-neutral-content">Country:</span>
			<span class="font-bold">{conference.country}</span>
		</p>
		<p class="mt-2">
			<span class="text-neutral-content">City:</span>
			<span class="font-bold">{conference.city}</span>
		</p>
		<p class="mt-2">
			<span class="text-neutral-content">Venue:</span>
			<span class="font-bold">{conference.venue}</span>
		</p>
		<p class="mt-2">
			<span class="text-neutral-content">Website:</span>
			<span class="font-bold">
				<a class="link link-accent" href={conference.website_url}>
					{conference.website_url}
				</a>
			</span>
		</p>
		<p class="mt-2">
			<span class="text-neutral-content">Description:</span>
			{@html conference.description}
		</p>
	</article>
</section>
