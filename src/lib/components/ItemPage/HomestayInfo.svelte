<script lang="ts">
    import Star from "../Star.svelte";
    import { StarType } from "$lib/types/types";
    
    import type { HomestayInfo } from "$lib/types/types";

    export let className = "";

    const homestayInfo: HomestayInfo = {
        name: "Homestay Name",
        stars: 4.9,
        numReviews: 11,
        address: "Hai Ba Trung, Ha Noi, Vietnam"
    }

</script>

<div class="{className}">
    <div class="font-bold text-3xl px-1 py-2 text-[#222222]">{homestayInfo.name}</div>
    <div class="flex flex-row items-center justify-start space-x-2">
        <Star starType={StarType.FULL} className="text-2xl"></Star>
        <div class="text-xl text-[#E86A33]">{homestayInfo.stars}</div>
        <div class="text-2xl">·</div>
        <div class="underline text-[#555555] text-xl underline-offset-4">{homestayInfo.numReviews} reviews</div>
        <div class="text-2xl">·</div>
        <div class="underline text-[#555555] text-xl underline-offset-4">{homestayInfo.address}</div>
        <div></div>
    </div>
</div>