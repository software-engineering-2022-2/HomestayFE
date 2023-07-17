<script lang="ts">
	import { goto } from "$app/navigation";

	let query = "";
	let condition = "name"

	function handleKeydown(e : KeyboardEvent) {
		if (e.key === "Enter"){
			if (query.trim().length === 0){
				return;
			}
			goto(`/homestay/?${condition}=${query}`)
		}
	}
</script>

<div class="flex flex-row bg-white border-2 border-gray-400 rounded-xl w-[40rem] h-[3.75rem] items-center focus-within:border-orange-500">
	<iconify-icon class="text-3xl p-4 text-[#E86A33]" icon="charm:search"></iconify-icon>
	<input bind:value={query} on:keydown={handleKeydown} class="outline-none caret-transparent focus:caret-black w-full text-xl text-gray-600" placeholder="Enter where you want to go" />
	<div class="relative group font-lato text-gray-700">
		<button class="mx-4 flex flex-row items-center dropdown border-2 border-gray-300 rounded pl-4 pr-2">
			{condition} <iconify-icon icon="gridicons:dropdown"></iconify-icon>
		</button>
		<div class="absolute p-3 w-[10rem] bg-white rounded-lg shadow-xl dropdown-content hidden group-hover:flex flex-col items-start">
			<button on:click={()=> condition = 'name'} type="button" class="hover:bg-[#f9f9f9] w-full text-start">Name</button>
			<button on:click={()=> condition = 'city'} type="button" class="hover:bg-[#f9f9f9] w-full text-start">City</button>
		</div>
	</div>
	
	
</div>

