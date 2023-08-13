<script lang="ts">
	import Center from '../Center.svelte';

	export let handleChangePage: (current_page: number) => void;
	export let current_page: number;
	export let max_page: number;
</script>
{#if max_page != 0}
<Center className="my-2">
	<div class="flex flex-row space-x-5 items-center">
		{#if current_page > 0}
			<button
				class="bg-blue-400 rounded-md p-1"
				on:click={() => {
					current_page--;
					handleChangePage(current_page);
				}}>Previous</button
			>
		{/if}

		<div>{current_page + 1} / <strong>{max_page}</strong></div>

		{#if current_page < max_page - 1}
			<button
				class="bg-green-400 rounded-md p-1"
				on:click={() => {
					current_page++;
					handleChangePage(current_page);
				}}>Next</button
			>
		{/if}
	</div>
</Center>
{/if}
<style>
</style>
