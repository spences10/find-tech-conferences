<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$env/static/public';
	import { Header } from '$lib/components';
	import * as Fathom from 'fathom-client';
	import '../app.css';

	$effect(() => {
		if (browser) {
			Fathom.load(PUBLIC_FATHOM_ID, {
				url: PUBLIC_FATHOM_URL,
			});
		}
	});

	// Track pageview on route change
	$effect(() => {
		page.url.pathname, browser && Fathom.trackPageview();
	});
	let { children } = $props();
</script>

<main class="container mx-auto px-5">
	<!-- <Header /> -->
	{@render children()}
</main>
