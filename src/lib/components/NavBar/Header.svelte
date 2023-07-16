<script lang="ts">
	import AuthenMenu from '../Authen/AuthenMenu.svelte';
	import ProfileMenu from '../Profile/ProfileMenu.svelte';

	import { userDetailStore } from '$lib/stores/stores';

	$: isAuthenicated = $userDetailStore.username !== '';
    import { apiCalling } from '$lib/stores/stores';
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
</div>
