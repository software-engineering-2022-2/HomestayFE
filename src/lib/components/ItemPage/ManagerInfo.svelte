<script lang="ts">
    export let className = '';
	
	import { managerInfo } from "$lib/stores/stores";
</script>

<div class="flex flex-row justify-between {className}">
	<div>
		<div class="font-[500] text-2xl font-lato">Hosted by {$managerInfo.name}</div>
		<div class="flex flex-row items-center space-x-2">
			<div class="text-[#555555] text-xl">{$managerInfo.numHomestays} rooms</div>
		</div>
	</div>
    <div>
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
</div>
