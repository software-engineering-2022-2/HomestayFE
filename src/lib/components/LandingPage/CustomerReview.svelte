<script lang="ts">
    let stars = 4.0;
    import FiveStars from "../FiveStars.svelte";
</script>

<div class="grid grid-flow-row justify-items-center w-[1200px] h-[240px] bg-white rounded-2xl px-32 py-5">
    <div class="font-[800] text-2xl underline underline-offset-1">Hear from our customers</div>
    <div class="text-black italic font-[500] text-xl">This is a very good homestay chain company. I planned my trip for 3 days but it turned into a year of living among the woods. I had a great time and highly recommend you try this out!</div>
    <div class="flex flex-row w-full justify-between">
        <div>
            <FiveStars stars = {stars} className="text-[#E86A33] text-2xl"></FiveStars>
        </div>
        <div class="font-bold text-xl">- Long Hoang</div>
    </div>
</div>