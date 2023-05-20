<script lang="ts">
	import type { User } from './+page';
	import MyButton from '$lib/components/MyButton.svelte'
	const user: User = {
		username: 'Trung'
	};
	import Button, { Label } from '@smui/button';
	let clicked = 0;
</script>

<h1>Welcome to SvelteKit {user.username}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button on:click={() => clicked++} class="myClass">
	<Label>With a Class</Label>
</Button>
<MyButton></MyButton>
<div>Clicked: {clicked}</div>
