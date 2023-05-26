<script lang="ts">
    import Center from "$lib/components/Center.svelte";
    import Item from "./Item.svelte";
</script>

<Center className="pt-24">
    <div class="text-white underline-offset-4 underline font-bold text-5xl">OFFER</div>
</Center>

<div class="flex flex-row gap-x-[100px] justify-center p-16">
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
</div>


<Center>
    <button class="bg-[#E86A33] text-white w-[250px] h-[50px] rounded-2xl text-2xl font-bold">View all offers</button>
</Center>
