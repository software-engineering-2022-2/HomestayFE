<script lang="ts">
	// Client side rendering
	export const ssr = false;
	import AuthenMenu from '../Authen/AuthenMenu.svelte';
	import ProfileMenu from '../Profile/ProfileMenu.svelte';

	import { userDetailStore, clearUserDetailStore } from '$lib/stores/stores';
	import { clearTokens } from '$lib/api/headers';

	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { tokens } from '$lib/api/headers';
	import { userAPI } from '$lib/api/api';
	import { page } from '$app/stores';

	import { reloadStore } from '$lib/stores/reload';
	import { apiCalling } from '$lib/stores/stores';
	import type { UserDetail } from '$lib/types/types';
	import { NotFoundError, UnauthorizedError } from '$lib/api/exception';
	import { goto } from '$app/navigation';

	async function getUserDetail() {
		// Do token verification
		let userDetail: UserDetail;
		if (get(tokens).token !== '') {
			try {
				userDetail = await userAPI.getUserDetail(get(userDetailStore).username);
			} catch (error) {
				if (error instanceof UnauthorizedError) {
					// alert(error.message)
				}
				if (error instanceof NotFoundError) {
					// alert(error.message)
				}
				reloadStore.set(true);
				return;
			}
			userDetailStore.set(userDetail);
		}
	}

	onMount(() => {
		getUserDetail();
	});

	// Reload when value is set to true
	reloadStore.subscribe((value) => {
		if (value) {
			clearTokens();
			clearUserDetailStore();
			reloadStore.set(false);
			goto('/')
		}
	});

	tokens.subscribe((value) => {
		if (value.token == '') return;
		getUserDetail();
	});

	$: isAuthenicated = $userDetailStore.username !== '';
	$: headerName = $userDetailStore.is_superuser ? 'CalmStay Admin' : 'CalmStay';

	let buttonActiveClass = 'rounded-lg px-2 py-1 bg-white text-orange-700';
	let buttonClass = 'rounded-lg px-2 py-1 bg-white text-green-700';
</script>

<div>
	<div class="flex flex-col bg-[#41644A] text-white py-4">
		<div class="flex justify-center items-center">
			<div class="w-[56px]" />
			{#if $apiCalling}
				<div class="w-[56px]" />
			{/if}
			<a
				href="/"
				class="cursor-pointer text-2xl font-bold flex flex-grow justify-center items-center"
				>{headerName}</a
			>
			{#if $apiCalling}
				<div class="w-[50px] h[50px]">
					<img alt="" src="/loading.svg" />
				</div>
			{/if}
			{#if isAuthenicated === false}
				<AuthenMenu />
			{:else}
				<ProfileMenu />
			{/if}
		</div>
		{#if $userDetailStore.is_superuser}
			<div class="flex flex-row justify-center space-x-7 items-center">
				<button class={$page.url.pathname == '/admin/user' ? buttonActiveClass : buttonClass}
					on:click={() => goto("/admin/user")}
					>User</button
				>
				<button class={$page.url.pathname.startsWith('/admin/homestay') ? buttonActiveClass : buttonClass}
					on:click={() => goto("/admin/homestay")}
					>Homestay</button
				>
				<button class={$page.url.pathname == '/admin/priceconfig' ? buttonActiveClass : buttonClass}
					on:click={() => goto("/admin/priceconfig")}
					>Price Config</button
				>
				<button class={$page.url.pathname == '/admin/service' ? buttonActiveClass : buttonClass}
					on:click={() => goto("/admin/service")}
					>Service</button
				>
			</div>
		{/if}
	</div>
</div>
