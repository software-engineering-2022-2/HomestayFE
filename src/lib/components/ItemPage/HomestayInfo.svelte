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
    <div class="font-[500] text-4xl px-1 py-2">{homestayInfo.name}</div>
    <div class="flex flex-row items-center justify-start space-x-2">
        <Star starType={StarType.FULL} className="text-4xl"></Star>
        <div class="text-2xl text-[#E86A33]">{homestayInfo.stars}</div>
        <div class="text-4xl">·</div>
        <div class="underline text-[#555555] text-2xl underline-offset-4">{homestayInfo.numReviews} reviews</div>
        <div class="text-4xl">·</div>
        <div class="underline text-[#555555] text-2xl underline-offset-4">{homestayInfo.address}</div>
        <div></div>
    </div>
</div>