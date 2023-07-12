<script lang="ts">
    export let className = '';
	let hostname = 'Long Hoang';
	let maxGuests = 21;
	let rooms = 12;
</script>

<div class="flex flex-row justify-between {className}">
	<div>
		<div class="font-[500] text-2xl font-lato">Hosted by {hostname}</div>
		<div class="flex flex-row items-center space-x-2">
			<div class="text-[#555555] text-xl">{maxGuests} guests</div>
			<div class="text-[#555555] text-xl">·</div>
			<div class="text-[#555555] text-xl">{rooms} rooms</div>
		</div>
	</div>
    <div>
        <iconify-icon class="text-6xl" icon="healthicons:ui-user-profile"></iconify-icon>
    </div>
</div>
