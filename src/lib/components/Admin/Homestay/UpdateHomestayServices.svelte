<script lang="ts">
	import { homestayAPI, serviceAPI } from '$lib/api/api';
	import { reloadStore } from '$lib/stores/reload';
	import type { HomestayInfo, IService } from '$lib/types/types';
	export const ssr = false;
	import { onMount } from 'svelte';

	import { getContext } from 'svelte';
	import UpdateHomestayService from './UpdateHomestayService.svelte';
	import { FieldsError, NetworkError, UnauthorizedError } from '$lib/api/exception';

	const homestayId = getContext('homestay_id') as string;

	let homestayServices: IService[] = [];
	let homestayInfo: HomestayInfo;

	let editing = false;
	let editingHomestayService: IService | null = null;

	function turnOnEditing(homestayService: IService) {
		editingHomestayService = homestayService;
		editing = true;
	}
	
	async function updateHomestayService(event: { detail: { serviceDetail: IService } }) {
		const serviceDetail = event.detail.serviceDetail;
		try {
			await serviceAPI.updateServiceDetail(serviceDetail, homestayId)
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
		alert(`Update service ${serviceDetail.id} (${serviceDetail.service_type.name}) success!`);
		editing = false;
		//Reload
		homestayServices = [...homestayServices];
	}

	onMount(async () => {
		try {
			[homestayInfo, homestayServices] = await Promise.all([
				homestayAPI.getHomestayInfo(homestayId),
				serviceAPI.getHomestayServices(homestayId)
			]);
		} catch (error) {
			alert('Error when loading homestay');
			reloadStore.set(true);
		}
	});
</script>

{#if homestayInfo}
	<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		<div class="bg-white shadow overflow-hidden sm:rounded-md">
			<div class="px-4 py-5 border-b border-gray-200 flex flex-row justify-between">
				<h3 class="text-xl leading-6 text-gray-800">Manage Homestay {homestayInfo.name}</h3>
				<img class="object-cover h-[50px] w-[100px]" src={homestayInfo.imageLink} alt="Homestay" />
			</div>
			<ul class="divide-y divide-gray-200">
				{#each homestayServices as homestayService}
					<li class="px-4 py-5 sm:px-6">
						<div class="flex flex-row justify-between">
							<div class="basis-1/4">{homestayService.service_type.name}</div>
							<div class="basis-1/4">
								{homestayService.availability ? 'available' : 'not available'}
							</div>
							<div class="basis-1/4">{homestayService.price}</div>

							<button on:click={() => turnOnEditing(homestayService)} class="basis-1/4 text-2xl"
								><iconify-icon icon="mingcute:edit-line" /></button
							>
						</div>
					</li>
				{/each}
				<li class="px-4 py-5 sm:px-6">
					<div class="flex flex-row justify-end">
						<button><iconify-icon class="text-3xl text-green-500" icon="gridicons:add" /></button>
					</div>
				</li>
			</ul>
		</div>
	</div>
{/if}

{#if editing && editingHomestayService}
	<UpdateHomestayService
		serviceDetail={editingHomestayService}
		on:submit={updateHomestayService}
		on:cancel={() => (editing = false)}
	/>
{/if}
