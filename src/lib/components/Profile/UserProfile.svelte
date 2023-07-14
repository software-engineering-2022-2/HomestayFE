<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { userDetailStore } from '$lib/store/store';
	import type { UserDetail } from '$lib/types/types';
	import { get } from 'svelte/store';
	import { userApi } from '$lib/api/api';
	import { reloadStore } from '$lib/store/reload';
	import ChangePasswordModal from './ChangePasswordModal.svelte';
	import { BACKEND_MEDIA_URL } from '$lib/api/api';

	$: if (browser && $userDetailStore.username === '') {
		goto('/');
	}
	let isEditing = false;
	let isPasswordEditing = false;
	let formUserDetail: UserDetail;

	$: if (isEditing) {
		formUserDetail = get(userDetailStore);
	}

	async function updateProfile() {
		formUserDetail.avatar = undefined
		const newUserDetail = await userApi.updateUserDetail($userDetailStore.username, formUserDetail);
		if (newUserDetail !== null) {
			userDetailStore.set(newUserDetail);
		} else {
			reloadStore.set(true);
		}
		isEditing = false;
	}

	async function handleChangePassword(event: { detail: { password: string; newPassword: string } }){
		const { password, newPassword } = event.detail;
		const result = await userApi.updatePassword($userDetailStore.username, password, newPassword);
		if (result){
			alert('Change password success!');
		} else {
			alert('Change password failed!');
		}
		isPasswordEditing = false;
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
			const avatar = await userApi.updateAvatar($userDetailStore.username, files[0]);
			if (avatar){
				userDetailStore.update(storeValue => {
					storeValue.avatar = avatar;
					return storeValue;
				});
				alert("Upload Image Success");
			} else {
				alert("Upload Image Failed");
			}
		}
	}
</script>

<div
	class="bg-white w-[41.5rem] h-[42rem] rounded-xl flex flex-col items-center py-6 px-12 space-y-6 justify-between"
>
	<div class="text-[#374151] font-bold underline text-3xl">User profile</div>

	<div class="overflow-clip rounded-full h-[10rem] w-[10rem] border border-black">
		<div class="relative flex flex-col items-center">
			{#if $userDetailStore.avatar}
			<div><img class="h-[10rem] w-[10rem] object-cover" src={`${BACKEND_MEDIA_URL}/${$userDetailStore.avatar}`} alt="" /></div>
			{:else}
			<iconify-icon class="text-[10rem] rounded-full" icon="healthicons:ui-user-profile" />
			{/if}
			
			<div class="absolute bottom-0 w-[8.4rem] h-[2.3rem] text-white bg-[#374151B2]">
				<input bind:files={files} accept="image/*" id="avatar-upload" style="display: none;" type="file" on:change={updateAvatar}>
				<button class="h-full w-full" on:click={openFileDialog}>Replace</button>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-2 self-start w-full">
		<div>
			<div class="key">First name</div>
			{#if isEditing}
				<input class="w-full value_input" type="text" bind:value={formUserDetail.firstName} />
			{:else}
				<div class="value">
					{$userDetailStore.firstName === '' ? 'Unfilled' : $userDetailStore.firstName}
				</div>
			{/if}
		</div>
		<div>
			<div class="key">Last name</div>

			{#if isEditing}
				<input class="w-full value_input" type="text" bind:value={formUserDetail.lastName} />
			{:else}
				<div class="value">
					{$userDetailStore.lastName === '' ? 'Unfilled' : $userDetailStore.lastName}
				</div>
			{/if}
		</div>
		<div>
			<div class="key">Username</div>
			<div class="value">{$userDetailStore.username}</div>
		</div>
		<div class="flex flex-row items-center">
			<button class="key">Password</button> 
			<button on:click={()=> isPasswordEditing = true}><iconify-icon icon="bxs:edit"></iconify-icon></button>
			{#if isPasswordEditing}
				<ChangePasswordModal on:submit={handleChangePassword} on:cancel={()=> isPasswordEditing = false}></ChangePasswordModal>
			{/if}
		</div>
		<div>
			<div class="key">Phone</div>

			{#if isEditing}
				<input class="w-full value_input" type="text" bind:value={formUserDetail.phoneNumber} />
			{:else}
				<div class="value">{$userDetailStore.phoneNumber || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="key">Email</div>
			{#if isEditing}
				<input class="w-full value_input" type="email" bind:value={formUserDetail.email} />
			{:else}
				<div class="value">{$userDetailStore.email || 'Unfilled'}</div>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-2 self-start w-full">
		<div>
			<div class="key">Street number</div>

			{#if isEditing}
				<input class="w-full value_input" type="text" bind:value={formUserDetail.streetNumber} />
			{:else}
				<div class="value">{$userDetailStore.streetNumber || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="key">Street name</div>
			{#if isEditing}
				<input class="w-full value_input" type="text" bind:value={formUserDetail.streetName} />
			{:else}
				<div class="value">{$userDetailStore.streetName || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="key">District</div>
			{#if isEditing}
				<input class="w-full value_input" type="text" bind:value={formUserDetail.district} />
			{:else}
				<div class="value">{$userDetailStore.district || 'Unfilled'}</div>
			{/if}
		</div>
		<div>
			<div class="key">City</div>
			{#if isEditing}
				<input class="w-full value_input" type="text" bind:value={formUserDetail.city} />
			{:else}
				<div class="value">{$userDetailStore.city || 'Unfilled'}</div>
			{/if}
		</div>
	</div>

	<div>
        {#if isEditing}
            <button class="button_text rounded-xl bg-[#41644A] w-[10rem] h-[2.5rem]" on:click={updateProfile}>Update profile</button>
        {:else}
            <button class="button_text rounded-xl bg-[#41644A] w-[10rem] h-[2.5rem]" on:click={() => (isEditing = true)}>Edit</button>
        {/if}
	</div>
</div>

<style>
	.key {
		color: #374151;
		font-size: 1.25rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.value {
		color: #777;
		font-size: 1.125rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	input {
		color: #9a9595;
		font-size: 1.125rem;
		font-style: normal;
		font-weight: 400;
		border: 1px solid black;
		line-height: normal;
	}
	.button_text {
		color: #fff;
		font-size: 1.125rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
</style>
