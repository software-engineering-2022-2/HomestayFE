<script lang="ts">
    import { homestayInfo } from "$lib/stores/stores";
</script>

<div class="grid grid-cols-4 justify-items-center w-full h-[360px] rounded-xl overflow-clip">
    <img 
        class="col-span-2 object-cover h-full w-full"
        src="{$homestayInfo.imageLink}" 
        alt="Homestay"
    >
    <div class="bg-[#41644A] w-full h-full"></div>
    <div class="bg-[#263A29] w-full h-full"></div>
</div>