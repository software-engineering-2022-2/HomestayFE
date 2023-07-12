<script lang="ts">
    import MenuBar from "./MenuBar.svelte";
    import AuthenMenu from '../Authen/AuthenMenu.svelte';
	import ProfileMenu from '../Profile/ProfileMenu.svelte';
    
    import { userDetailStore } from "$lib/stores/stores";

    $: isAuthenicated = $userDetailStore.username !== "";
</script>

<div>
    <div class="flex py-2 justify-center items-center bg-[#41644A] text-white">
        <div class="w-[56px]"></div>
        <a href="/" class="cursor-pointer text-2xl font-bold flex flex-grow justify-center items-center">Homestay Name</a>
        {#if isAuthenicated === false}
            <AuthenMenu/>
        {:else}
            <ProfileMenu/>
        {/if }
    </div>

    <MenuBar></MenuBar>    
</div>