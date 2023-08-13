<script lang="ts">
	export const ssr = false;
	import { homestayAPI } from '$lib/api/api';
	import { FieldsError, UnauthorizedError } from '$lib/api/exception';
	import { reloadStore } from '$lib/stores/reload';
	import type { IHomestayPage } from '$lib/types/types';
	import { onMount } from 'svelte';
	import Pagination from './Pagination.svelte';

	let queryString = '';
	let currentPage = 0;

	let homestayPage: IHomestayPage = {
		current_page: 0,
		max_page: 0,
		data: []
	};

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

	onMount(() => {
		findHomestay(0);
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
						<div class="basis-1/2">{homestayDetail.name}</div>
						<div class="basis-1/2">
							<img
								class="object-cover h-[50px] w-[100px]"
								src={homestayDetail.imageLink}
								alt="Homestay"
							/>
						</div>
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
