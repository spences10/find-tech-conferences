<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';

	const { form } = $props<{ form: FormData }>();
</script>

<h1>Sign up</h1>
<p>
	Or <a href="/login" class="link link-primary">sign in</a> to your account
</p>
<form
	method="POST"
	use:enhance
	class="flex max-w-xl flex-col justify-center gap-4 px-10 py-10 lg:px-16"
>
	<Input
		id="username"
		type="text"
		label="Username"
		placeholder="Username"
		required={true}
		errors={form?.errors?.username}
	/>
	<Input
		id="email"
		type="email"
		label="Email"
		placeholder="me@example.com"
		required={true}
		errors={form?.errors?.email}
	/>

	<Input
		id="password"
		type="password"
		label="Password"
		placeholder="🤫"
		required={true}
		errors={form?.errors?.password}
	/>

	<Input
		id="passwordConfirm"
		type="password"
		label="Confirm Password"
		placeholder=""
		required={true}
		errors={form?.errors?.passwordConfirm}
	/>

	<Input
		id="name"
		type="text"
		label="Your Name"
		placeholder="Your Name"
		required={false}
		errors={form?.errors?.name}
	/>

	<button type="submit" class="btn btn-primary rounded-box shadow-lg">
		Continue
	</button>
</form>
