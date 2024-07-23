<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import { Success } from '$lib/icons';

	const { form } = $props<{ form: FormData }>();
</script>

<h1>Password Reset</h1>
<p>
	Or <a href="/login" class="link link-primary">sign in</a> to your account
</p>
<form
	method="POST"
	use:enhance
	class="flex max-w-xl flex-col justify-center gap-4 px-10 py-10 lg:px-16"
>
	<Input
		id="email"
		type="email"
		label="Email"
		placeholder="me@example.com"
		required={true}
		errors={form?.errors?.email}
	/>

	<button type="submit" class="btn btn-primary rounded-box shadow-lg">
		Request Reset
	</button>
	{#if form?.success}
		<div role="alert" class="alert alert-success">
			<Success />
			<span>Email sent to reset your password.</span>
		</div>
	{/if}
</form>
