<script lang="ts">
	export let className = "";
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let time: Date = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 500);
	});
	$: currentTime = time;

	function showAllHomestays() {
		goto(`/homestay`);
	}
</script>

<div class="grid grid-cols-2 justify-items-center bg-[#E86A33] w-full {className}">
	<div class="grid grid-flow-row py-8 text-white">
		<div class="text-2xl font-bold">NEW MEMBER DISCOUNT</div>
		<div class="text-2xl font-bold">
			{currentTime.getHours()}:{currentTime.getMinutes()}:{currentTime.getSeconds()}
		</div>
		<div class="text-xl font-[400]">Get 30% off your first stay!</div>
	</div>
	<div class="m-auto">
		<button on:click={showAllHomestays} class="text-white font-semibold text-xl px-5 py-3 bg-[#41644A] border-white border-2 rounded-2xl">
			Book Now
		</button>
	</div>
</div>
