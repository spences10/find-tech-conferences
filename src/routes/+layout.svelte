<script lang="ts">
	import '../app.css';
	
	// import { browser } from '$app/environment';
	// import { page } from '$app/stores';
	// import { PUBLIC_FATHOM_ID, PUBLIC_FATHOM_URL } from '$env/static/public';
	// import { Header } from '$lib/components';
	// import * as Fathom from 'fathom-client';
	// import { onMount } from 'svelte';
	// import '../app.postcss';

	// onMount(() => {
	// 	Fathom.load(PUBLIC_FATHOM_ID, {
	// 		url: PUBLIC_FATHOM_URL,
	// 		excludedDomains: ['localhost']
	// 	});
	// });

	// $: $page.url.pathname, browser && Fathom.trackPageview();
	// let { children } = $props();
</script>

<main class="container mx-auto px-5">
	<!-- <Header></Header> -->
	<!-- {@render children?.()} -->
	 <slot />
</main>
