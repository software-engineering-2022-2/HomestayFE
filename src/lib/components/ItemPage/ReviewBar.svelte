<script lang="ts">
    import { StarType } from "$lib/types/types";
    import Star from "../Star.svelte";

    import { homestayInfo } from "$lib/stores/stores";
</script>

<div class="flex flex-row items-center justify-start space-x-2">
    <Star starType={StarType.FULL} className="text-2xl"></Star>
    <div class="text-2xl font-[500] font-lato text-[#E86A33]">{$homestayInfo.avg_rating}</div>
    <div class="text-2xl">·</div>
    <div class="text-2xl font-[500]">{$homestayInfo.numReviews} reviews</div>
    <div></div>
</div>