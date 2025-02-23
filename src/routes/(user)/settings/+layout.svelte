<script lang="ts">
	import { page } from '$app/stores';

	const { children } = $props();
	let links = [
		{ href: `/settings/profile`, title: `Profile` },
		{ href: `/settings/account`, title: `Account` },
		{ href: `/settings/security`, title: `Security` },
	];
</script>

<div class="prose-xl w-full">
	<h2>Account Settings</h2>
	<div class="my-4 border-b border-base-300"></div>
</div>

<div
	class="flex w-full flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
>
	<nav class="md:w-60">
		<ul
			class="menu menu-horizontal rounded-box bg-base-100 md:menu-vertical px-0"
		>
			{#each links as { href, title }}
				<li>
					<a
						{href}
						class="font-medium {$page.url.pathname === href
							? `menu-active`
							: ``}"
					>
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="flex-grow">
		{@render children()}
	</div>
</div>
