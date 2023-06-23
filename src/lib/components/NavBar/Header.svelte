<script lang="ts">
    import { goto } from '$app/navigation'
    import MenuBar from "./MenuBar.svelte";
    import AuthenMenu from '../Authen/AuthenMenu.svelte';
</script>

<div>
    <div class="flex py-4 justify-center items-center bg-[#41644A] text-white">
        <div class="w-[56px]"></div>
        <a href="/" class="cursor-pointer text-2xl font-bold flex flex-grow justify-center items-center">Homestay Name</a>
        <AuthenMenu/>
    </div>

    <MenuBar></MenuBar>    
</div>