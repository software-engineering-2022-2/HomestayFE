<script lang="ts">
	import { managerAPI } from '$lib/api/api';
    import type { HomestayInfo } from '$lib/types/types';
    import { formatPrice } from '$lib/types/utils';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let homestay: HomestayInfo;

    let isEditing = false;

    let editableHomestay = { ...homestay };

    function toggleEdit() {
        isEditing = !isEditing;
        if (isEditing) {
            editableHomestay = { ...homestay };
        }
    }

    async function saveChanges() {
        try {
            homestay = { ...editableHomestay };
            toggleEdit();
            await managerAPI.updateHomestayDetail(editableHomestay.id, editableHomestay);
            alert("Updated homestay details successfully.");
            location.reload();
        } catch (error) {
            alert("Failed to update homestay details.");
            console.log(error);
        }
    }
</script>

<div class="bg-black bg-opacity-20 fixed inset-0 flex items-center justify-center z-10">
    <div class="bg-white shadow-xl rounded-lg p-6 w-[680px]">
        <h3 class="text-lg font-semibold mb-4">
            {#if isEditing}
                <input bind:value={editableHomestay.name} class="border-2 w-full rounded-md p-1"/>
            {:else}
                {homestay.name}
            {/if}
        </h3>
        <img src={homestay.image} alt="Homestay" class="rounded-md mb-2 w-full h-full max-h-[240px] object-cover"/>
        
        {#if isEditing}
            <div class="mb-4 flex gap-3 justify-between">
                <div class="w-[30%]">
                    <div class="block text-gray-700 font-semibold mb-1">District:</div>
                    <input type="text" bind:value={editableHomestay.district} class="border-2 w-full rounded-md p-1" />
                </div>
                <div class="w-[30%]">
                    <div class="block text-gray-700 font-semibold mb-1">City:</div>
                    <input type="text" bind:value={editableHomestay.city} class="border-2 w-full rounded-md p-1" />
                </div>
                <div class="w-[30%]">
                    <div class="block text-gray-700 font-semibold mb-1">Availability:</div>
                    <select bind:value={editableHomestay.availability} class="bg-white border-2 rounded-md p-2 text-md">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            </div>
            <div class="mb-4 flex gap-3 justify-between">
                <div class="w-[70%]">
                    <div class="block text-gray-700 font-semibold mb-1">Price:</div>
                    <input type="text" bind:value={editableHomestay.price} class="border-2 w-full rounded-md p-1" />
                </div>
                <div class="w-[30%]">
                    <div class="block text-gray-700 font-semibold mb-1">Price Configuration:</div>
                    <select bind:value={editableHomestay.pricing_config_id} class="border-2">
                      {#each Array(40) as _, i}
                        <option value={i}>{i}</option>
                      {/each}
                    </select>
                </div>  
            </div>
            
            <div class="mb-4">
                <div class="block text-gray-700 font-semibold mb-1">Description:</div>
                <textarea bind:value={editableHomestay.description} class="border-2 w-full h-[120px] rounded-md p-1"></textarea>
            </div>

            <div class="mb-4 flex gap-6">
                <div>
                    <div class="block text-gray-700 font-semibold mb-1">Max. adults:</div>
                    <select bind:value={editableHomestay.max_num_adults} class="border-2">
                      {#each Array(21) as _, i}
                        <option value={i}>{i}</option>
                      {/each}
                    </select>
                </div>                  
                <div>
                    <div class="block text-gray-700 font-semibold mb-1">Max. children:</div>
                    <select bind:value={editableHomestay.max_num_children} class="border-2">
                      {#each Array(21) as _, i}
                        <option value={i}>{i}</option>
                      {/each}
                    </select>
                </div>                  
            </div>

        {:else}
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">Availability:</span> {homestay.availability}
            </p>
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">Price:</span> {formatPrice(homestay.price)}
            </p>
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">Price Configuration:</span> {homestay.pricing_config_id}
            </p>
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">Description:</span> {homestay.description}
            </p>
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">District:</span> {homestay.district}
            </p>
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">City:</span> {homestay.city}
            </p>
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">Max. adults:</span> {homestay.max_num_adults}
            </p>
            <p class="text-gray-700 mb-2 text-md">
                <span class="font-semibold">Max. children:</span> {homestay.max_num_children}
            </p>
        {/if}
        
        <div class="flex justify-end gap-2">
            {#if isEditing}
                <button class="text-white bg-green-500 text-md py-0.5 px-3 rounded-md" on:click={saveChanges}>Save</button>
                <button class="text-gray-500 border-gray-500 border-2 text-md py-0.5 px-3 rounded-md" on:click={toggleEdit}>Cancel</button>
            {:else}
                <button class="text-white bg-blue-500 text-md py-0.5 px-3 rounded-md" on:click={toggleEdit}>Edit</button>
                <button class="text-gray-500 border-gray-500 border-2 text-md py-0.5 px-3 rounded-md" on:click={() => dispatch('closeModal')}>Close</button>
            {/if}
        </div>
    </div>
</div>
