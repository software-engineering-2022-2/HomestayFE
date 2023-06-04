<script lang="ts">
	export let className = "";
	import { onMount } from 'svelte';
	import Center from '../Center.svelte';
	let time: Date = new Date();
	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 500);
	});
	$: currentTime = time;
</script>

<div class="grid grid-cols-2 justify-items-center bg-[#E86A33] w-full {className}">
	<div class="grid grid-flow-row py-8 text-white">
		<div class="text-4xl font-[800]">NEW MEMBER DISCOUNT</div>
		<div class="text-4xl font-[800]">
			{currentTime.getHours()}:{currentTime.getMinutes()}:{currentTime.getSeconds()}
		</div>
		<div class="text-3xl font-[400]">Get 30% off your first stay!</div>
	</div>
	<div class="m-auto">
		<button
			class="text-white font-[700] text-3xl p-5 bg-[#41644A] border-white border-4 rounded-2xl"
			>Book Now</button
		>
	</div>
</div>
