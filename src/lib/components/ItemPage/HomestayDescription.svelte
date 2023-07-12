<script lang="ts">
	export let className = '';
	let description =
		'The Mirror Villa is luxurious all the way and features everything you can expect from a smart,\
		upscale property of 21st century. It impresses with utilizing contemporary and distinctive\
		materials, finishing with the utmost attention to details and quality, innovative technologies\
		and high-end appliances.';
</script>

<div class="flex flex-col space-y-[6px] {className}">
	<div class="font-[400] font-lato text-2xl">Description</div>
	<div class="text-xl text-[#555555] font-lato">{description}</div>
</div>
