<script lang="ts">
    export let className = '';
	let hostname = 'Long Hoang';
	let maxGuests = 21;
	let rooms = 12;
</script>
<div class="flex flex-col space-y-3 {className}">
	<div class="flex flex-row space-x-4">
		<div>
			<div class="font-[500] text-3xl font-lato">Hosted by {hostname}</div>
			<div class="text-xl font-lato text-[#555555]">Joined in 2023</div>
		</div>
		<iconify-icon class="text-6xl" icon="healthicons:ui-user-profile"></iconify-icon>
	</div>
	<div class="flex flex-row items-center space-x-10">
		<div class="flex flex-row items-center space-x-3">
			<iconify-icon class="text-5xl font-bold" icon="iconoir:verified-user"></iconify-icon>
			<div class="font-lato text-2xl">Identity Verified</div>
		</div>
		<div class="flex flex-row items-center space-x-3">
			<iconify-icon class="text-5xl font-bold" icon="iconoir:people-rounded"></iconify-icon>
			<div class="font-lato text-2xl">Superhost</div>
		</div>
	</div>

	<div class="whitespace-pre-line font-lato text-2xl">
		<strong>Long Hoang is a Superhost</strong>
		
		Superhosts are experienced, highly rated hosts who are 
		committed to providing great stays for guests.

		Language: English
		Response rate: 100%

		Response time: within an hour
		
	</div>
	<div>
		<button class="text-[#41644A] font-lato text-2xl px-5 py-4 rounded-xl border-4 font-bold border-[#41644A]">Contact host</button>
	</div>
	
</div>

