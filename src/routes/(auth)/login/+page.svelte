<!-- <script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import { Error } from '$lib/icons';

	const { form } = $props<{ form: FormData }>();
</script>

<h1>Sign in</h1>
<p>
	Or <a href="/signup" class="link link-primary">sign up</a> for an account
</p>
<form
	method="POST"
	use:enhance
	class="flex max-w-xl flex-col justify-center gap-4 px-10 py-10 lg:px-16"
>
	<div class="form-control">
		<Input
			id="email"
			type="email"
			label="Email"
			placeholder="me@example.com"
			required={true}
			errors={form?.errors?.email}
		/>
	</div>

	<div class="form-control">
		<Input
			id="password"
			type="password"
			label="Password"
			placeholder="🤫"
			required={true}
			errors={form?.errors?.password}
		/>
	</div>

	<p>
		Forgot your password? <a href="/reset" class="link link-primary">
			Reset it
		</a>
	</p>
	{#if form?.notVerified}
		<div role="alert" class="alert alert-error">
			<Error />
			<span>Verify your email address before signing in.</span>
		</div>
	{/if}
	<button type="submit" class="btn btn-primary rounded-box shadow-lg">
		Sign in
	</button>
</form> -->