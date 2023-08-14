<script lang="ts">
    import type { HomestayInfo } from '$lib/types/types';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let homestay: HomestayInfo;
</script>

<div class="bg-black bg-opacity-20 fixed inset-0 flex items-center justify-center z-10">
    <div class="bg-white shadow-xl rounded-lg p-6 w-[680px]">
        <h3 class="text-lg font-semibold mb-4">{homestay.name}</h3>
        <img src={homestay.imageLink} alt="Homestay" class="rounded-md mb-2 w-full h-full max-h-[240px] object-cover"/>
        <p class="text-gray-700 mb-2 text-md">
        <span class="font-semibold">Availability:</span> {homestay.available}
        </p>
        <p class="text-gray-700 mb-2 text-md">
        <span class="font-semibold">Price:</span> {homestay.price}
        </p>
        <p class="text-gray-700 mb-2 text-md">
        <span class="font-semibold">Price Configuration:</span> {homestay.pricing_config}
        </p>
        <p class="text-gray-700 mb-2 text-md">
        <span class="font-semibold">Description:</span> {homestay.description}
        </p>
        <p class="text-gray-700 mb-2 text-md">
        <span class="font-semibold">Address:</span> {homestay.address}
        </p>
        <p class="text-gray-700 mb-2 text-md">
            <span class="font-semibold">Max. adults:</span> {homestay.max_num_adults}
        </p>
        <p class="text-gray-700 mb-2 text-md">
            <span class="font-semibold">Max. children:</span> {homestay.max_num_children}
        </p>
        
        <div class="flex justify-end">
            <button class="text-gray-500 border-gray-500 border-2 text-md py-0.5 px-3 rounded-md" on:click={() => dispatch('closeModal')}>Close</button>
        </div>
    </div>
</div>