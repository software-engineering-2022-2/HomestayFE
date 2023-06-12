<script lang="ts">
    import MenuBar from "./MenuBar.svelte";
    import AuthenMenu from '../Authen/AuthenMenu.svelte';
</script>

<div>
    <div class="flex justify-center items-center bg-[#41644A] text-white">
        <div class="2xl:py-9 2xl:text-4xl font-bold">Homestay Name</div>
        <AuthenMenu/>
    </div>
    <MenuBar></MenuBar>
         
</div>