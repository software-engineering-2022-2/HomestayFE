<script lang="ts">
    import type { Review } from "$lib/types/types";
	import FiveStars from "../FiveStars.svelte";

    export let review: Review;

</script>

<div class="flex flex-col space-y-5">
    <div class="flex flex-row items-center">
        <iconify-icon class="text-5xl" icon="healthicons:ui-user-profile"></iconify-icon>
        <div class="flex flex-col ml-5">
            <div class="font-lato text-xl font-[600]">{review.username}</div>
            <div class="font-lato text-lg text-[#555555]">{review.date}</div>
        </div>
        <div class="ml-8"><FiveStars className="text-[#E86A33] text-2xl" stars = {review.stars}></FiveStars></div>
    </div>
    <div class="font-lato text-xl text-[#444444]">{review.content}</div>
</div>

