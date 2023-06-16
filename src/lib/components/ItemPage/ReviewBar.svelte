<script lang="ts">
    import { StarType } from "$lib/types/types";
    import Star from "../Star.svelte";
    import type { HomestayInfo } from "$lib/types/types";

    const homestayInfo: HomestayInfo = {
        name: "Homestay Name",
        stars: 4.9,
        numReviews: 11,
        address: "Hai Ba Trung, Ha Noi, Vietnam"
    }
</script>

<div class="flex flex-row items-center justify-start space-x-2">
    <Star starType={StarType.FULL} className="text-4xl"></Star>
    <div class="text-3xl font-[700] font-lato text-[#E86A33]">{homestayInfo.stars}</div>
    <div class="text-5xl">·</div>
    <div class="text-3xl font-[500]">{homestayInfo.numReviews} reviews</div>
    <div></div>
</div>