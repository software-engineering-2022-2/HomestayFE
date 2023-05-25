<!-- <div class="bg-homestay-bg min-w-full h-auto object-contain"> -->

<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import SearchBar from "$lib/components/LandingPage/SearchBar.svelte";
</script>

<div class="relative">
    <Image className="absolute w-[100vw] h-[100vh] object-cover -z-50" src='/background_image.jpg'></Image>
    <SearchBar></SearchBar>
</div>