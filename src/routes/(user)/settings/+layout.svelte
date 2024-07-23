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
	<div class="divider"></div>
</div>

<div
	class="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0"
>
	<nav class="md:w-60">
		<ul
			class="menu menu-horizontal rounded-box bg-base-100 px-0 md:menu-vertical"
		>
			{#each links as { href, title }}
				<li>
					<a
						{href}
						class="font-medium {$page.url.pathname === href
							? `active`
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
