<script lang="ts">
	import { goto } from '$app/navigation';
	export const ssr = false;
	import { userAPI } from '$lib/api/api';
	import { FieldsError, UnauthorizedError } from '$lib/api/exception';
	import { reloadStore } from '$lib/stores/reload';
	import type { UserDetail } from '$lib/types/types';
	import { onMount } from 'svelte';
	import CreateUser from './CreateUser.svelte';
	import UpdateUser from './UpdateUser.svelte';

	let queryString = '';

	let usersList: UserDetail[] = [];

	let editing = false;
	let editingUserDetail: UserDetail | null = null;
	let isCreatingUser = false;

	async function findUsers() {
		try {
			usersList = await userAPI.getAllUsers(queryString);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				alert(error.message);
				reloadStore.set(true);
			}
			usersList = [];
		}
	}

	async function deleteUser(username: string) {
		try {
			await userAPI.deteleUser(username);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				alert(error.message);
				reloadStore.set(true);
			}
			return;
		}
		alert(`Delete user ${username} success!`);
		// Filter from list display
		usersList = usersList.filter((value) => value.username != username);
	}

	function turnOnEditing(userDetail: UserDetail) {
		editingUserDetail = userDetail;
		console.log(editingUserDetail)
		editing = true;
	}

	async function handleUpdateProfile(event: { detail: { userDetail: UserDetail } }) {
		const userDetail = event.detail.userDetail;
		userDetail.avatar = undefined;
		try {
			await userAPI.updateUserDetail(userDetail.username, userDetail);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				alert(error.message);
				reloadStore.set(true);
			}
			if (error instanceof FieldsError) {
				alert(error.getMessage());
			}
			return;
		}
		editing = false;
	}

	onMount(async () => {
		usersList = await userAPI.getAllUsers(queryString);
	})
</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
	<div class="bg-white shadow overflow-hidden sm:rounded-md">
		<div class="px-4 py-5 border-b border-gray-200 flex flex-row justify-between">
			<h3 class="text-xl leading-6 text-gray-800">Manage Users</h3>
			<div>
				<input
					bind:value={queryString}
					class="outline-green-300 border-green-600 border rounded-md"
				/>
				<button on:click={findUsers}>Search</button>
			</div>
		</div>
		<ul class="divide-y divide-gray-200">
			{#each usersList as userDetail}
				<li class="px-4 py-5 sm:px-6">
					<div class="flex flex-row justify-between">
						<div class="basis-1/4">{userDetail.username}</div>
						<div class="basis-1/4">{userDetail.email}</div>
						<button class="basis-1/4" on:click={() => turnOnEditing(userDetail)}
							><iconify-icon icon="mingcute:edit-line" /></button
						>
						<button class="basis-1/4" on:click={() => deleteUser(userDetail.username)}>
							<iconify-icon class="text-red-600 text-2xl" icon="ic:baseline-delete" /></button
						>
					</div>
				</li>
			{/each}
			<li class="px-4 py-5 sm:px-6">
				<div class="flex flex-row justify-end">
					<button on:click={() => isCreatingUser = true}><iconify-icon class="text-3xl text-green-500" icon="gridicons:add" /></button>
				</div>
			</li>
		</ul>
	</div>
</div>

{#if editing && editingUserDetail}
	<UpdateUser
		on:submit={handleUpdateProfile}
		on:cancel={() => (editing = false)}
		userDetail={editingUserDetail}
	/>
{/if}

{#if isCreatingUser}
	<CreateUser on:submit={() => (isCreatingUser = false)} on:cancel={() => (isCreatingUser = false)} />
{/if}
