<script lang="ts">
	import ReviewBar from "./ReviewBar.svelte";
    export let className = '';
    import type { Review } from "$lib/types/types";
	import UserReview from "./UserReview.svelte";

    let userReview1: Review = {
        username: 'Viet NQ',
        date: 'April 2022',
        stars: 3.0,
        content: 'The place was boring though the food was good. But I think I would go there again since there is a beautiful bitch in front of the house.'
    }

    let userReview2: Review = {
        username: 'Trung CT',
        date: 'April 2022',
        stars: 4.0,
        content: 'The place was fantastic to say the least. Kateryna was helpful with any questions I had before the  booking and her communication was good throughout our stay...'
    }

    const userReviews: Review[] = [userReview1, userReview2];
</script>

<div class="{className} flex flex-col space-y-5">
    <ReviewBar></ReviewBar>
    {#each userReviews as userReview}
        <UserReview review={userReview}></UserReview>
    {/each}
    <div><button class="text-xl font-bold font-lato underline text-[#41644A] underline-offset-4">More Review</button></div>
</div>
