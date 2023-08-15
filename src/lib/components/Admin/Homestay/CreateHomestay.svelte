<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { ICreateHomestay, IPricingConfig, UserDetail } from '$lib/types/types';
	import { getPriceConfigTooltip } from '$lib/types/utils';
	import { userAPI } from '$lib/api/api';
	import { reloadStore } from '$lib/stores/reload';

	const dispatch = createEventDispatcher();

	export let allPriceConfig: IPricingConfig[];
	export let allManagers: UserDetail[];
	let query = '';

	let showImage = false;
	let image: HTMLImageElement;
	let input: HTMLInputElement;

	let homestayName = '';
	let price: number;
	let max_num_adults: number;
	let max_num_children: number;
	let district = '';
	let city = '';
	let street_name = '';
	let street_number = '';
	let selectedPricingID: number;
	let description = '';
	let selectedManagerID: string;

	function submit() {
		if (
			!price ||
			!max_num_adults ||
			!max_num_children ||
			!selectedManagerID ||
			!selectedPricingID ||
			street_name == '' ||
			street_number == '' ||
			allManagers.length == 0 ||
			!input ||
			!input.files ||
			!input.files[0]
		) {
			alert('Please include all information!');
			return;
		}
		const homestayCreateInfo: ICreateHomestay = {
			name: homestayName,
			price: price,
			max_num_adults: max_num_adults,
			max_num_children: max_num_children,
			district: district,
			city: city,
			street_name: street_name,
			street_number: street_number,
			allow_pet: false,
			availability: true,
			description: description,
			pricing_config_id: selectedPricingID,
			manager_id: selectedManagerID
		};
		dispatch('submit', { homestayCreateInfo: homestayCreateInfo, bgImage: input.files[0] });
	}

	async function searchHomestayManagers() {
		try {
			allManagers = await userAPI.getAllManagers(query);
		} catch (error) {
			alert('Error when get managers list');
			reloadStore.set(true);
		}
	}

	function onChange() {
		if (!input || !input.files) {
			showImage = false;
			return;
		}

		const myFile = input.files[0];

		const reader = new FileReader();
		reader.addEventListener('load', function () {
			image.setAttribute('src', reader.result?.toString() || '');
		});
		reader.readAsDataURL(myFile);
		showImage = true;
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
		<div class="flex flex-row justify-between items-center">
			<h2 class="text-xl font-bold text-gray-800">Create Homestay:</h2>
			{#if showImage}
				<img class="object-cover h-[50px] w-[100px]" bind:this={image} src={''} alt="Homestay" />
			{/if}
			<button on:click={() => input.click()} class="text-2xl"
				><iconify-icon icon="material-symbols:upload" /></button
			>
			<input
				bind:this={input}
				accept="image/*"
				style="display: none;"
				type="file"
				on:change={onChange}
			/>
		</div>

		<div class="grid grid-cols-2 self-start w-full gap-3">
			<div>
				<div class="text-xl">Homestay Name</div>
				<input class="w-full value_input border-2 rounded" type="text" bind:value={homestayName} />
			</div>
			<div>
				<div class="text-xl">Price in VND</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					step="0.01"
					bind:value={price}
				/>
			</div>
			<div>
				<div class="text-xl">Max Adults</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					bind:value={max_num_adults}
				/>
			</div>
			<div>
				<div class="text-xl">Max Children</div>
				<input
					class="w-full value_input border-2 rounded"
					type="number"
					bind:value={max_num_children}
				/>
			</div>
			<div>
				<div class="text-xl">District</div>
				<input class="w-full value_input border-2 rounded" type="text" bind:value={district} />
			</div>
			<div>
				<div class="text-xl">City</div>
				<input class="w-full value_input border-2 rounded" type="text" bind:value={city} />
			</div>
			<div>
				<div class="text-xl">Pricing Config</div>
				<select class="border-2 rounded w-full" bind:value={selectedPricingID}>
					{#each allPriceConfig as priceConfig}
						<option title={`${getPriceConfigTooltip(priceConfig)}`} value={priceConfig.id}
							>{priceConfig.name}</option
						>
					{/each}
				</select>
			</div>
			<div>
				<div class="text-xl">Street Name</div>
				<input class="w-full value_input border-2 rounded" type="text" bind:value={street_name} />
			</div>
			<div>
				<div class="text-xl">Street Number</div>
				<input class="w-full value_input border-2 rounded" type="text" bind:value={street_number} />
			</div>

			<div>
				<div class="text-xl">Manager</div>
				<div class="flex flex-row">
					<input bind:value={query} class=" border-green-600 border rounded-lg" />
					<button on:click={() => searchHomestayManagers()}>Search</button>
				</div>
				<select class="border-2 rounded w-full" bind:value={selectedManagerID}>
					{#each allManagers as manager}
						<option value={manager.id}>{manager.username}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="w-full">
			<div class="text-xl">Description</div>
			<textarea class="w-full border-2 min-h-[50px]" bind:value={description} />
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
