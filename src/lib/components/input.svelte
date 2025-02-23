<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		id?: string;
		label?: string;
		type?: string;
		disabled?: boolean;
		required?: boolean;
		errors?: string[];
		font_size?: string;
		input_classes?: string;
	}

	let {
		value = '',
		placeholder = '',
		id = '',
		label = '',
		type = 'text',
		disabled = false,
		required = false,
		errors = [],
		font_size = 'text-base',
		input_classes = '',
	}: Props = $props();
</script>

<div class="form-control mb-2 w-full">
	<label for={id} class="label pb-1 font-medium">
		<span class="label-text {font_size}">{label}</span>
	</label>
	<input
		class="input rounded-box border-secondary w-full border border-dotted shadow-lg {font_size} {input_classes}"
		{type}
		{id}
		{placeholder}
		{required}
		{disabled}
		name={id}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label pb-0">
				<span class="label-text-alt text-error font-bold"
					>{error}</span
				>
			</label>
		{/each}
	{/if}
</div>
