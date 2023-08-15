<script lang="ts">
	export const ssr = false;
	import { adminAPI, homestayAPI, priceConfigAPI, serviceAPI, userAPI } from '$lib/api/api';
	import { FieldsError, NetworkError, UnauthorizedError } from '$lib/api/exception';
	import { reloadStore } from '$lib/stores/reload';
	import type { IPricingConfig, PricingConfig } from '$lib/types/types';
	import { onMount } from 'svelte';
	import UpdatePricingConfig from './UpdatePricingConfig.svelte';
	import CreatePricingConfig from './CreatePricingConfig.svelte';

	let isEditing = false;
	let isEditingPricingConfig: IPricingConfig | null = null;
	let isCreating = false;

	async function turnOnEditing(pricingConfig: IPricingConfig) {
		isEditingPricingConfig = { ...pricingConfig };
		isEditing = true;
	}

	async function updatePricingConfig(event: { detail: { pricingConfig: IPricingConfig } }) {
		const pricingConfigDetail = event.detail.pricingConfig;
		let newPricingConfig: IPricingConfig;
		try {
			newPricingConfig = await priceConfigAPI.updatePricingConfig(pricingConfigDetail);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				alert(error.message);
				reloadStore.set(true);
			}
			if (error instanceof FieldsError) {
				alert(error.getMessage());
			}
			if (error instanceof NetworkError) {
				alert(error.message);
				reloadStore.set(true);
			}
			return;
		}
		alert(`Update pricing config ${pricingConfigDetail.name} success`);
		isEditing = false;
		allPricingConfigs = [];
		allPricingConfigs = await priceConfigAPI.getAllPriceConfig();
	}

	async function createPricingConfig(event: { detail: { pricingConfig: IPricingConfig } }) {
		const pricingConfigDetail = event.detail.pricingConfig;
		let newPricingConfig: IPricingConfig;
		try {
			newPricingConfig = await priceConfigAPI.createPricingConfig(pricingConfigDetail);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				alert(error.message);
				reloadStore.set(true);
			}
			if (error instanceof FieldsError) {
				alert(error.getMessage());
			}
			if (error instanceof NetworkError) {
				alert(error.message);
				reloadStore.set(true);
			}
			return;
		}
		alert(`Create pricing config ${pricingConfigDetail.name} success`);
		isCreating = false;
		allPricingConfigs = [...allPricingConfigs, newPricingConfig]
	}

	let allPricingConfigs: IPricingConfig[] = [];

	onMount(async () => {
		allPricingConfigs = await priceConfigAPI.getAllPriceConfig();
	});
</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
	<div class="bg-white shadow overflow-hidden sm:rounded-md">
		<div class="px-4 py-5 border-b border-gray-200 flex flex-row justify-between">
			<h3 class="text-xl leading-6 text-gray-800">Manage Homestays</h3>
		</div>
		<ul class="divide-y divide-gray-200">
			<li class="px-4 py-5 sm:px-6">
				<div class="flex flex-row justify-between font-bold">
					<div class="basis-1/6">Name</div>
					<div class="basis-1/6">Free Cancelation Days</div>
					<div class="basis-1/6">Discount</div>
					<div class="basis-1/6">Deposit Percentage</div>
					<div class="basis-1/5">Cancelation Refund Percentage</div>
					<div class="basis-1/12" />
				</div>
			</li>
			{#each allPricingConfigs as pricingConfig}
				<li class="px-4 py-5 sm:px-6">
					<div class="flex flex-row justify-between">
						<div class="basis-1/6">{pricingConfig.name}</div>
						<div class="basis-1/6">{pricingConfig.free_cancellation_days}</div>
						<div class="basis-1/6">{pricingConfig.discount}</div>
						<div class="basis-1/5">{pricingConfig.deposit_percentage}</div>
						<div class="basis-1/6">{pricingConfig.cancellation_refund_percentage}</div>
						<button
							class="text-2xl basis-1/12"
							title="Pricing Config Edit"
							on:click={() => turnOnEditing(pricingConfig)}
							><iconify-icon icon="mingcute:edit-line" /></button
						>
					</div>
				</li>
			{/each}
			<li class="px-4 py-5 sm:px-6">
				<div class="flex flex-row justify-end">
					<button on:click={() => isCreating = true}><iconify-icon class="text-3xl text-green-500" icon="gridicons:add" /></button>
				</div>
			</li>
		</ul>
	</div>
</div>

{#if isEditing && isEditingPricingConfig}
	<UpdatePricingConfig
		pricingConfig={isEditingPricingConfig}
		on:submit={updatePricingConfig}
		on:cancel={() => (isEditing = false)}
	/>
{/if}

{#if isCreating}
	<CreatePricingConfig on:submit={createPricingConfig} on:cancel={() => isCreating = false}/>
{/if}
