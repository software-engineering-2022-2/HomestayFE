<script lang="ts">
    export let className = '';
	
	import { hostInfo } from "$lib/stores/stores";
</script>

<div class="flex flex-row justify-between {className}">
	<div>
		<div class="font-[500] text-2xl font-lato">Hosted by {$hostInfo.name}</div>
		<div class="flex flex-row items-center space-x-2">
			<div class="text-[#555555] text-xl">{$hostInfo.numGuests} guests</div>
			<div class="text-[#555555] text-xl">·</div>
			<div class="text-[#555555] text-xl">{$hostInfo.numRooms} rooms</div>
		</div>
	</div>
    <div>
        <iconify-icon class="text-6xl" icon="healthicons:ui-user-profile"></iconify-icon>
    </div>
</div>
