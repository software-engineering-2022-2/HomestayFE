<script lang="ts">
    import Center from "$lib/components/Center.svelte";
    import Item from "./Item.svelte";
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
    <button class="bg-[#E86A33] text-white w-[200px] h-[40px] rounded-xl text-xl font-semibold">View all offers</button>
</Center>
