<script lang="ts">
	export const ssr = false;
	import { adminAPI, homestayAPI, priceConfigAPI, serviceAPI, userAPI } from '$lib/api/api';
	import { FieldsError, NetworkError, UnauthorizedError } from '$lib/api/exception';
	import { reloadStore } from '$lib/stores/reload';
	import type { IPricingConfig, IServiceType, PricingConfig } from '$lib/types/types';
	import { onMount } from 'svelte';
	import UpdateServiceType from './UpdateServiceType.svelte';
	import CreateServiceType from './CreateServiceType.svelte';
	

	let isEditing = false;
	let isEditingServiceType: IServiceType | null = null;
	let isCreating = false;

	async function turnOnEditing(serviceType: IServiceType) {
		isEditingServiceType = { ...serviceType };
		isEditing = true;
	}

	async function updateServiceType(event: { detail: { serviceType: IServiceType } }) {
		const serviceTypeDetail = event.detail.serviceType;
		let newServiceType: IServiceType;
		try {
			newServiceType = await adminAPI.updateServiceType(serviceTypeDetail)
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
		alert(`Update pricing config ${newServiceType.name} success`);
		isEditing = false;
		allServiceTypes = [];
		allServiceTypes = await adminAPI.getAllServiceTypes()
	}

	async function createServiceType(event: { detail: { serviceType: IServiceType } }) {
		const serviceTypeDetail = event.detail.serviceType;
		let newServiceType: IServiceType;
		try {
			newServiceType = await adminAPI.createServiceType(serviceTypeDetail);
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
		alert(`Create service type ${serviceTypeDetail.name} success`);
		isCreating = false;
		allServiceTypes = [...allServiceTypes, newServiceType]
	}

	let allServiceTypes: IServiceType[] = [];

	onMount(async () => {
		allServiceTypes = await adminAPI.getAllServiceTypes();
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
					<div>ID</div>
					<div>Name</div>
					<div/>
				</div>
			</li>
			{#each allServiceTypes as serviceType}
				<li class="px-4 py-5 sm:px-6">
					<div class="flex flex-row justify-between">
						<div>{serviceType.id}</div>
						<div>{serviceType.name}</div>
						<button
							class="text-2xl basis-1/12"
							title="Service Type Edit"
							on:click={() => turnOnEditing(serviceType)}
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

{#if isEditing && isEditingServiceType}
	<UpdateServiceType
		serviceType={isEditingServiceType}
		on:submit={updateServiceType}
		on:cancel={() => (isEditing = false)}
	/>
{/if}

{#if isCreating}
	<CreateServiceType on:submit={createServiceType} on:cancel={() => isCreating = false}/>
{/if}
