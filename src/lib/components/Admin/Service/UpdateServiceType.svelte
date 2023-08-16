<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { IServiceType } from '$lib/types/types';
	const dispatch = createEventDispatcher();

	export let serviceType: IServiceType;

	function submit() {
		dispatch('submit', { serviceType });
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
		<h2 class="text-xl font-bold text-gray-800">Update Service Type: ({serviceType.id})</h2>
		<div class="grid grid-cols-2 self-start w-full gap-3">
			<div>
				<div class="text-xl">Name</div>
				<input
					class="w-full value_input border-2 rounded"
					type="text"
					bind:value={serviceType.name}
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
