<script lang="ts">
	import { goto } from "$app/navigation";

	let query = "";

	function handleKeydown(e : KeyboardEvent) {
		if (e.key === "Enter"){
			if (query.trim().length === 0){
				return;
			}
			goto(`/search/${query}`)
		}
	}
</script>

<div class="flex flex-row bg-white border-2 border-black rounded-xl w-[40rem] h-[3.75rem] items-center focus-within:border-orange-500">
	<iconify-icon class="text-3xl p-4 text-[#E86A33]" icon="charm:search"></iconify-icon>
	<input bind:value={query} on:keydown={handleKeydown} class="outline-none caret-transparent focus:caret-black w-full text-xl" placeholder="Enter where you want to go" />
</div>
