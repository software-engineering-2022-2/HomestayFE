<script lang="ts">
    import Star from "./Star.svelte";
    import { StarType } from "$lib/types/types";
    const NUM_STARS = 5;
    export let stars: number;
    export let className = '';
    
    function roundToPointFive(num: number) {
        return Math.round(num * 2) / 2;
    }

    function preprocessStars(stars: number) {
        let roundedStars = roundToPointFive(stars)
        let fullStars = Math.floor(roundedStars);

        let halfStar = roundedStars - fullStars;
        let noStars = halfStar > 0? NUM_STARS - fullStars - 1: NUM_STARS - fullStars;
        
        const starsArray = [];
        for (let i = 0; i < fullStars; i++) {
            starsArray.push(StarType.FULL);
        }

        if (halfStar) {
            starsArray.push(StarType.HALF);
        }

        for (let i = 0; i < noStars; i++) {
            starsArray.push(StarType.NONE);
        }

        return starsArray;
    }

    let starsArray = preprocessStars(stars)

</script>


{#each starsArray as starType}
    <Star className={className} starType = {starType}></Star>
{/each}

