<script lang="ts">
	// Client side rendering
	export const ssr = false;
	import AuthenMenu from '../Authen/AuthenMenu.svelte';
	import ProfileMenu from '../Profile/ProfileMenu.svelte';

	import { userDetailStore, clearUserDetailStore } from "$lib/stores/stores";
    import { clearTokens } from "$lib/api/headers";

	import { onMount } from "svelte";
	import { get } from 'svelte/store';
	import { tokens } from '$lib/api/headers';
	import { userAPI } from '$lib/api/api';

	import { reloadStore } from "$lib/stores/reload";
	import { apiCalling } from '$lib/stores/stores';
	import type { UserDetail } from "$lib/types/types";
	import { NotFoundError, UnauthorizedError } from "$lib/api/exception";

	async function getUserDetail() {
        // Do token verification
        let userDetail: UserDetail
        if (get(tokens).token !== ""){
            try {
                userDetail = await userAPI.getUserDetail(get(userDetailStore).username);
            } catch (error){
                if (error instanceof UnauthorizedError){
                    // alert(error.message)
                }
                if (error instanceof NotFoundError){
                    // alert(error.message)
                }
                reloadStore.set(true); 
                return;
            }
            userDetailStore.set(userDetail);
        }
    }

	onMount(()=>{
		getUserDetail();
	})

	// Reload when value is set to true
    reloadStore.subscribe((value) => {
        if (value){
            clearTokens();
            clearUserDetailStore();
            reloadStore.set(false);
        }
    })

	tokens.subscribe((value) => {
		if (value.token == "") return;
		getUserDetail();
	})


	$: isAuthenicated = $userDetailStore.username !== '';

    
</script>

<div>
	<div class="flex py-4 justify-center items-center bg-[#41644A] text-white">
		<div class="w-[56px]" />
        {#if $apiCalling}
            <div class="w-[56px]" />
        {/if}
		<a href="/" class="cursor-pointer text-2xl font-bold flex flex-grow justify-center items-center"
			>CalmStay</a
		>
        {#if $apiCalling}
            <div class="w-[50px] h[50px]">
                <img alt="" src="/loading.svg">
            </div>
        {/if}
		{#if isAuthenicated === false}
			<AuthenMenu />
		{:else}
			<ProfileMenu />
		{/if}
	</div>
	{#if $userDetailStore.is_superuser}
		<div>Admin</div>
	{/if}
</div>
