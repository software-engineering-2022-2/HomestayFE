<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { userDetailStore } from '$lib/stores/stores';
	import type { UserDetail } from '$lib/types/types';
	import { get } from 'svelte/store';
	import { userAPI } from '$lib/api/api';
	import { reloadStore } from '$lib/stores/reload';
	import ChangePasswordModal from './ChangePasswordModal.svelte';
	import { extractUrl } from '$lib/types/utils';
	import { UnauthorizedError, FieldsError, NotFoundError} from '$lib/api/exception';

	$: if (browser && $userDetailStore.username === '') {
		goto('/');
	}
	let isEditing = false;
	let isPasswordEditing = false;
	let formUserDetail: UserDetail = {
		username: "",
		first_name: "",
		last_name: ""
	};

	$: if (isEditing){
		formUserDetail = Object.assign({}, get(userDetailStore));
	}

	async function updateProfile() {
		formUserDetail.avatar = undefined
		let newUserDetail: UserDetail
		try {
			newUserDetail = await userAPI.updateUserDetail($userDetailStore.username, formUserDetail);
		} catch (error) {
			if (error instanceof UnauthorizedError){
				alert(error.message)
				reloadStore.set(true);
			}
			if (error instanceof FieldsError){
				alert(error.getMessage())
				isEditing = false;
			}
			return;
		}	
		userDetailStore.set(newUserDetail);
		isEditing = false;
	}

	async function handleChangePassword(event: { detail: { password: string; newPassword: string } }){
		const { password, newPassword } = event.detail;
		try {
			await userAPI.updatePassword($userDetailStore.username, password, newPassword);
		} catch (error){
			if (error instanceof UnauthorizedError){
				alert(error.message)
			}
			if (error instanceof FieldsError){
				alert(error.getMessage())
			}
			return;
		} finally {
			isPasswordEditing = false;
		}
		alert('Change password success!')
	}

	async function openFileDialog() {
		const fileInput = document.getElementById('avatar-upload');
		if (fileInput){
			fileInput.click();
		}
	}

	let files: FileList;

	async function updateAvatar() {
		if (files && files[0]){
			let avatar: string
			try {
				avatar = await userAPI.updateAvatar($userDetailStore.username, files[0]);
			} catch (error){
				if (error instanceof UnauthorizedError){
					alert(error.message)
				}
				if (error instanceof FieldsError) {
					alert(error.getMessage())
				}
				return;
			}
			userDetailStore.update(storeValue => {
				storeValue.avatar = avatar;
				return storeValue;
			});
			alert("Upload Image Success");
		}
	}
</script>

<div class="bg-white w-[42rem] h-[42rem] rounded-xl flex flex-col items-center py-6 px-12 space-y-6 justify-between">
	<div class="text-[#374151] font-bold text-3xl">User profile</div>

	<div class="overflow-clip rounded-full h-[10rem] w-[8.7rem] border-2 border-gray-500">
		<div class="relative flex flex-col items-center">
			{#if $userDetailStore.avatar}
				<div><img class="h-[10rem] w-[8.7rem] object-cover" src={`${extractUrl($userDetailStore.avatar)}`} alt=""/></div>
			{:else}
				<iconify-icon class="text-[10rem] rounded-full" icon="healthicons:ui-user-profile" />
			{/if}
			
			<div class="absolute bottom-2 w-[8.4rem] h-[5rem] text-white">
				<input bind:files={files} accept="image/*" id="avatar-upload" style="display: none;" type="file" on:change={updateAvatar}>
				<button class="h-full w-full" on:click={openFileDialog}>Replace</button>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-2 self-start w-full gap-3">
		<div>
			<div class="text-xl">First name</div>
			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="text" bind:value={formUserDetail.first_name} />
			{:else}
				<div class="text-lg text-gray-500">
					{$userDetailStore.first_name === '' ? 'Unfilled' : $userDetailStore.first_name}
				</div>
			{/if}
		</div>
		<div>
			<div class="text-xl">Last name</div>

			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="text" bind:value={formUserDetail.last_name} />
			{:else}
				<div class="text-lg text-gray-500">
					{$userDetailStore.last_name === '' ? 'Unfilled' : $userDetailStore.last_name}
				</div>
			{/if}
		</div>
		<div>
			<div class="text-xl">Username</div>
			<div class="text-lg text-gray-500">{$userDetailStore.username}</div>
		</div>
		<div>
			<button class="text-xl">Password</button> 
			<button class="text-lg" on:click={()=> isPasswordEditing = true}><iconify-icon icon="bxs:edit"></iconify-icon></button>
			{#if isPasswordEditing}
				<ChangePasswordModal on:submit={handleChangePassword} on:cancel={()=> isPasswordEditing = false}></ChangePasswordModal>
			{:else}
				<div>*****</div>
			{/if}
		</div>
		<div>
			<div class="text-xl">Phone</div>

			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="text" bind:value={formUserDetail.phone_number} />
			{:else}
				<div class="text-lg text-gray-500">{$userDetailStore.phone_number || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="text-xl">Email</div>
			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="email" bind:value={formUserDetail.email} />
			{:else}
				<div class="text-lg text-gray-500">{$userDetailStore.email || 'Unfilled'}</div>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-2 self-start w-full gap-3">
		<div>
			<div class="text-xl">Street number</div>

			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="text" bind:value={formUserDetail.street_number} />
			{:else}
				<div class="text-lg text-gray-500">{$userDetailStore.street_number || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="text-xl">Street name</div>
			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="text" bind:value={formUserDetail.street_name} />
			{:else}
				<div class="text-lg text-gray-500">{$userDetailStore.street_name || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="text-xl">District</div>
			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="text" bind:value={formUserDetail.district} />
			{:else}
				<div class="text-lg text-gray-500">{$userDetailStore.district || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="text-xl">City</div>
			{#if isEditing}
				<input class="w-full value_input border-2 rounded" type="text" bind:value={formUserDetail.city} />
			{:else}
				<div class="text-lg text-gray-500">{$userDetailStore.city || 'Unfilled'}</div>
			{/if}
		</div>
	</div>

	<div>
        {#if isEditing}
            <button class="text-lg text-white rounded-lg bg-[#41644A] w-[10rem] h-[2.5rem]" on:click={updateProfile}>Update profile</button>
			<button class="text-lg text-white rounded-lg bg-gray-400 w-[10rem] h-[2.5rem]" on:click={() => (isEditing = false)}>Cancel</button>
        {:else}
            <button class="text-lg text-white rounded-lg bg-[#41644A] w-[10rem] h-[2.5rem]" on:click={() => (isEditing = true)}>Edit</button>
        {/if}
	</div>
</div>


