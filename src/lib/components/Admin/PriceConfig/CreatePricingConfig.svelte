<script lang="ts">
	import type { IPricingConfig } from '$lib/types/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let name = '';
	let deposit_percentage: number;
	let cancellation_refund_percentage: number;
	let free_cancellation_days: number;
	let discount: number;

	async function submit() {
		const pricingConfig: IPricingConfig = {
			name,
			deposit_percentage,
			cancellation_refund_percentage,
			free_cancellation_days,
			discount
		} as IPricingConfig;
		// dispatch a custom event with the rating and review
		dispatch('submit', { pricingConfig });
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
		<h2 class="text-xl font-bold text-gray-800">Create new Pricing Config</h2>

		<div class="grid grid-cols-2 self-start w-full gap-3">
			<div>
				<div class="text-xl">Price Config Name</div>
				<input class="w-full value_input border-2 rounded" type="text" bind:value={name} />
			</div>
			<div>
				<div class="text-xl">Deposit Percentage</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					step="0.01"
					bind:value={deposit_percentage}
				/>
			</div>
            <div>
				<div class="text-xl">Cancellation Refund Percentage</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					step="0.01"
					bind:value={cancellation_refund_percentage}
				/>
			</div>

            <div>
				<div class="text-xl">Free Cancellation Days</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					step="0.01"
					bind:value={free_cancellation_days}
				/>
			</div>

            <div>
				<div class="text-xl">Discount</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					bind:value={discount}
				/>
			</div>

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
