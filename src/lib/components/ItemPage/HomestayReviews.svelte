<script lang="ts">
	import ReviewBar from "./ReviewBar.svelte";
    export let className = '';
    import type { Review } from "$lib/types/types";
	import UserReview from "./UserReview.svelte";
    import { homestayInfo } from "$lib/stores/stores";
    $: userReviews = $homestayInfo?.reviews || []
</script>

<div class="{className} flex flex-col space-y-5">
    <ReviewBar></ReviewBar>
    {#each userReviews as userReview}
        <UserReview review={userReview}></UserReview>
    {/each}
    <div><button class="text-xl font-bold font-lato underline text-[#41644A] underline-offset-4">More Review</button></div>
</div>
