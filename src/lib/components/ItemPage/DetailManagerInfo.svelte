<script lang="ts">
    export let className = '';
	import { managerInfo } from "$lib/stores/stores";
	
</script>
<div class="flex flex-col space-y-3 {className}">
	<div class="flex flex-row space-x-4">
		<div>
			<div class="font-[500] text-2xl font-lato">Hosted by {$managerInfo.name} </div>
			<div class="text-xl font-lato text-[#555555]">Joined in 2023</div>
		</div>
		{#if $managerInfo.avatarLink}
			<img 
				class="w-[64px] h-[64px] object-cover rounded-full"
				src="{$managerInfo.avatarLink}" 
				alt="Manager avatar"
			>
		{:else}
			<iconify-icon class="text-6xl" icon="healthicons:ui-user-profile"></iconify-icon>
		{/if}
	</div>
	<div class="flex flex-row items-center space-x-10">
		<div class="flex flex-row items-center space-x-3">
			<iconify-icon class="text-4xl font-bold" icon="iconoir:verified-user"></iconify-icon>
			<div class="font-lato text-xl">Identity Verified</div>
		</div>
		<div class="flex flex-row items-center space-x-3">
			<iconify-icon class="text-4xl font-bold" icon="iconoir:people-rounded"></iconify-icon>
			<div class="font-lato text-xl">Superhost</div>
		</div>
	</div>

	<div class="whitespace-pre-line font-lato text-xl text-[#333333]">
		<strong>{$managerInfo.name} is a Superhost</strong>
		
		Superhosts are experienced, highly rated hosts who are 
		committed to providing great stays for guests.

		Language: English
		Response rate: 100%

		Response time: within an hour
		
	</div>
	<div>
		<button class="text-[#41644A] font-lato text-xl px-5 py-2 rounded-xl border-[3px] font-bold border-[#41644A]">Contact host</button>
	</div>
	
</div>

