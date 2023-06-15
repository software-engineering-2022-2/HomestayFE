<script lang="ts">
    import MenuBar from "./MenuBar.svelte";
    import AuthenMenu from '../Authen/AuthenMenu.svelte';
</script>

<div>
    <div class="flex py-3 justify-center items-center bg-[#41644A] text-white">
        <div class="w-[56px]"></div>
        <div class="text-2xl font-bold flex flex-grow justify-center items-center">Homestay Name</div>
        <AuthenMenu/>
    </div>

    <MenuBar></MenuBar>    
</div>