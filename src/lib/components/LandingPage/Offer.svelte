<script lang="ts">
	import { goto } from "$app/navigation";
    import Center from "$lib/components/Center.svelte";
    import Item from "./Item.svelte";

    function showAllHomestays() {
        goto(`/homestay`);
    }
</script>

<Center className="pt-20">
    <div class="text-white underline-offset-4 underline font-semibold text-3xl">OFFERS</div>
</Center>

<div class="flex flex-row gap-x-[80px] justify-center px-16 py-16">
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
</div>

<Center>
    <button on:click={showAllHomestays} class="bg-[#E86A33] hover:bg-[#d1582d] text-white w-[200px] h-[40px] rounded-xl text-xl font-semibold">View all offers</button>
</Center>
