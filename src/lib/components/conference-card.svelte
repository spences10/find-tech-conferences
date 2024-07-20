<script lang="ts">
	export let conference: ConferenceData;
</script>

<section class="rounded-box bg-primary shadow-xl">
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
			<span class="text-neutral-content">Location:</span>
			<span class="font-bold">{conference.location}</span>
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
			<span class="font-bold">{conference.description}</span>
		</p>
	</article>
</section>
