<script lang="ts">
    let stars = 4.5;
    // Do some preprocess
    let starsPreprocessed = ['full', 'full', 'full', 'full', 'half'];


</script>

<div class="grid grid-flow-row justify-items-center w-[1500px] h-[250px] bg-white rounded-3xl px-32 py-5">
    <div class="font-[800] text-3xl underline underline-offset-1">Hear from our customers</div>
    <div class="text-black italic font-[500] text-2xl">This is a very good homestay chain company. I planned my trip for 3 days but it turned into a year of living among the woods. I had a great time and highly recommend you try this out!</div>
    <div class="flex flex-row w-full justify-between">
        <div>
            {#each starsPreprocessed as star}
                {#if star === 'full'}
                    <iconify-icon class="text-[#E86A33] text-4xl" icon="ant-design:star-filled"></iconify-icon>
                {:else} 
                    <iconify-icon class="text-[#E86A33] text-4xl" icon="ant-design:star-outlined"></iconify-icon>
                {/if}
            {/each}
        </div>
        <div class="font-bold text-2xl">- Long Hoang</div>
    </div>
</div>