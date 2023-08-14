<script lang="ts">
	export const ssr = false;
	import { adminAPI, homestayAPI, priceConfigAPI, serviceAPI } from '$lib/api/api';
	import { FieldsError, NetworkError, UnauthorizedError } from '$lib/api/exception';
	import { reloadStore } from '$lib/stores/reload';
	import type {
		HomestayInfo,
		IHomestayPage,
		IPricingConfig,
		IService,
		IServiceType
	} from '$lib/types/types';
	import { onMount } from 'svelte';
	import Pagination from './Pagination.svelte';
	import UpdateHomestay from './UpdateHomestay.svelte';
	import { goto } from '$app/navigation';
	let queryString = '';
	let currentPage = 0;

	let editing = false;
	let editingHomestayInfo: HomestayInfo | null = null;

	let homestayPage: IHomestayPage = {
		current_page: 0,
		max_page: 0,
		data: []
	};
	let files: FileList

	$: console.log(files)

	let allPriceConfig: IPricingConfig[] = [];

	async function turnOnEditing(homestayInfo: HomestayInfo) {
		const homestayInfoRes = await homestayAPI.getHomestayInfo(homestayInfo.id);
		editingHomestayInfo = homestayInfoRes;
		editing = true;
	}

	async function findHomestay(page: number) {
		try {
			let searchParams = new URLSearchParams();
			searchParams.set('page', page.toString());
			searchParams.set('name', queryString);
			homestayPage = {
				current_page: 0,
				max_page: 0,
				data: []
			};
			homestayPage = await homestayAPI.getAllHomestayInfoByCondition(searchParams);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				alert(error.message);
				reloadStore.set(true);
			}
			homestayPage = {
				current_page: 0,
				max_page: 0,
				data: []
			};
		}
	}

	async function handleUpdateHomestay(event: { detail: { homestayInfo: HomestayInfo } }) {
		const homestayDetail = event.detail.homestayInfo;
		try {
			await homestayAPI.updateHomestayInfo(homestayDetail);
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
		alert(`Update homestay ${homestayDetail.id} success!`);
		editing = false;
		//Reload
		findHomestay(currentPage);
	}

	async function openFileDialog() {
		const fileInput = document.getElementById('bg-upload');
		if (fileInput){
			fileInput.click();
		}
	}

	async function updateHSBG(homestayInfo: HomestayInfo) {
		if (files && files[0]){
			let bgImage: string
			try {
				bgImage = await homestayAPI.updateHomestayBackground(homestayInfo.id, files[0])
			} catch (error){
				if (error instanceof UnauthorizedError){
					alert(error.message)
				}
				if (error instanceof FieldsError) {
					alert(error.getMessage())
				}
				return;
			}
			alert(`Upload Background for Homestay ${homestayInfo.id} Success`);
			//Reload
			findHomestay(currentPage);
		}
	}

	onMount(async () => {
		findHomestay(0);
		allPriceConfig = await priceConfigAPI.getAllPriceConfig();
	});
</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
	<div class="bg-white shadow overflow-hidden sm:rounded-md">
		<div class="px-4 py-5 border-b border-gray-200 flex flex-row justify-between">
			<h3 class="text-xl leading-6 text-gray-800">Manage Homestays</h3>
			<div>
				<input
					bind:value={queryString}
					class="outline-green-300 border-green-600 border rounded-md"
				/>
				<button
					on:click={() => {
						currentPage = 0;
						findHomestay(0);
					}}>Search</button
				>
			</div>
		</div>
		<ul class="divide-y divide-gray-200">
			{#each homestayPage.data as homestayDetail}
				<li class="px-4 py-5 sm:px-6">
					<div class="flex flex-row justify-between">
						<div class="basis-1/4">{homestayDetail.name}</div>
						<div class="basis-1/4">
							<img
								class="object-cover h-[50px] w-[100px]"
								src={homestayDetail.imageLink}
								alt="Homestay"
							/>
						</div>
						<button
							class="basis-1/5 text-2xl"
							title="Homestay Info"
							on:click={() => turnOnEditing(homestayDetail)}
							><iconify-icon icon="mingcute:edit-line" /></button
						>
						<input bind:files={files} accept="image/*" id="bg-upload" style="display: none;" type="file" on:change={() => updateHSBG(homestayDetail)}>
						<button class="basis-1/5 text-2xl" title="Homestay Image"
							on:click={openFileDialog}
							><iconify-icon icon="ph:image" /></button
						>
						<button
							class="basis-1/5 text-2xl"
							title="Homestay Services"
							on:click={() => goto(`/admin/homestay/${homestayDetail.id}`)}
							><iconify-icon icon="material-symbols:room-service" /></button
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
		<Pagination
			bind:current_page={currentPage}
			handleChangePage={findHomestay}
			max_page={homestayPage.max_page}
		/>
	</div>
</div>

{#if editing && editingHomestayInfo}
	<UpdateHomestay
		on:submit={handleUpdateHomestay}
		on:cancel={() => (editing = false)}
		{allPriceConfig}
		homestayInfo={editingHomestayInfo}
	/>
{/if}
