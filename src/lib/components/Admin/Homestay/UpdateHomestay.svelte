<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { HomestayInfo, IPricingConfig } from '$lib/types/types';
	import { getPriceConfigTooltip } from '$lib/types/utils';

	const dispatch = createEventDispatcher();

	export let homestayInfo: HomestayInfo;
	export let allPriceConfig: IPricingConfig[];
	let selectedPricingID = homestayInfo.pricing_config.id

	function submit() {
		// dispatch a custom event with the rating and review
		dispatch('submit', { homestayInfo });
	}

	// Define a function to handle the cancel button click
	function cancel() {
		// Hide the review modal
		dispatch('cancel');
	}
</script>

<div class="overlay fixed inset-0 bg-black bg-opacity-50">
	<div
		class="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-8 rounded-lg w-[40rem]"
	>
		<h2 class="text-xl font-bold text-gray-800">Update homestay ({homestayInfo.id}):</h2>
		<div class="grid grid-cols-2 self-start w-full gap-3">
			<div>
				<div class="text-xl">Homestay Name</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={homestayInfo.name}
				/>
			</div>
			<div>
				<div class="text-xl">Price in VND</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					step="0.01"
					bind:value={homestayInfo.price}
				/>
			</div>
            <div>
				<div class="text-xl">Max Adults</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					bind:value={homestayInfo.max_num_adults}
				/>
                
			</div>
            <div>
				<div class="text-xl">Max Children</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					bind:value={homestayInfo.max_num_children}
				/>
                
			</div>
			<div>
				<div class="text-xl">District</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={homestayInfo.district}
				/>
			</div>
			<div>
				<div class="text-xl">City</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={homestayInfo.city}
				/>
			</div>
			<div>
				<div class="text-xl">Pricing Config</div>
				<select class="border-2 rounded w-full" bind:value={selectedPricingID}>
					{#each allPriceConfig as priceConfig}
						<option title={`${getPriceConfigTooltip(priceConfig)}`} value={priceConfig.id}>{priceConfig.name}</option>
					{/each} 
				</select>
			</div>
		</div>
		<div class="w-full">
			<div class="text-xl">Description</div>
			<textarea class="w-full min-h-[100px]" bind:value={homestayInfo.description} />
		</div>

		<div class="button mt-4 flex justify-center">
			<!-- Add a cancel button -->
			<button
				on:click={cancel}
				class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded mr-4"
				>Cancel</button
			>
			<button
				on:click={submit}
				class="bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-2 px-4 rounded"
				>Submit</button
			>
		</div>
	</div>
</div>
