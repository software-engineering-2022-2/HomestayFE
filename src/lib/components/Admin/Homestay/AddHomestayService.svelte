<script lang="ts">
	import type { IService, IServiceType } from '$lib/types/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let allServiceTypes: IServiceType[]

	let selectedServiceType: number
	let price: number
	let availability: boolean = false
	let description = ""

	async function submit() {
		if (price == undefined || selectedServiceType == undefined || description == "") {
			alert("Please input all information.")
			return;
		}
		const service: IService = {
			id: -1,
			availability: availability,
			description: description,
			price: price,
			service_type_id: selectedServiceType
		} as IService
		dispatch('submit', { service });
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
		<h2 class="text-xl font-bold text-gray-800">Add new service to homestay</h2>
		
		<div class="grid grid-cols-2 self-start w-full gap-3">
			<div>
				<div class="text-xl">Service Type</div>
				<select class="border-2 rounded w-full" bind:value={selectedServiceType}>
					{#each allServiceTypes as serviceType }
						<option value={serviceType.id}>{serviceType.name}</option>
					{/each} 
				</select>
			</div>

			<div>
				<div class="text-xl">Price in VND</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					bind:value={price}
				/>
			</div>

			<div>
				<div class="text-xl">Availability</div>
				<input
					class="value_input h-[15px] w-[15px]"
					type="checkbox"
					bind:checked={availability}
				/>
			</div>




		</div>

		<div class="w-full">
			<div class="text-xl">Description</div>
			<textarea class="w-full min-h-[100px]" bind:value={description}/>
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
