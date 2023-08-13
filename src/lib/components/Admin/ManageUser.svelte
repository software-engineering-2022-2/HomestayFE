<script lang="ts">
	import { goto } from '$app/navigation';
	export const ssr = false;
	import { userAPI } from '$lib/api/api';
	import { UnauthorizedError } from '$lib/api/exception';
	import { reloadStore } from '$lib/stores/reload';
	import type { UserDetail } from '$lib/types/types';

	let queryString = '';

	let usersList: UserDetail[] = [];

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
		alert(`Delete userr ${username} success!`);
		// Filter from list display
		usersList = usersList.filter((value) => value.username != username);
	}
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
						<div>{userDetail.username}</div>
						<div>{userDetail.email}</div>
						<button on:click={() => deleteUser(userDetail.username)}>
							<iconify-icon class="text-red-600 text-2xl" icon="ic:baseline-delete" /></button
						>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
