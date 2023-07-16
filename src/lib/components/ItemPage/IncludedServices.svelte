<script lang="ts">
	import type { IService } from "$lib/types/types";
    export let className = ""
    import { getContext } from "svelte";

    const homestayServices = getContext("homestayServices") as IService[]
</script>

<div class="flex flex-col space-y-[6px] {className}">
	<div class="font-[400] text-2xl font-lato">What this place offer</div>
    <div class="grid grid-rows-3 grid-flow-col">
        {#each homestayServices as service, i}
            <div class="flex flex-row space-x-5">
                {#if service.availability}
                <iconify-icon class="text-2xl text-[#41644A]" icon="healthicons:yes"></iconify-icon>
                {:else}
                <iconify-icon class="text-2xl text-red-600" icon="healthicons:no"></iconify-icon>
                {/if}
                <div class="text-xl font-lato">{service.service_type.name}</div>
            </div>
        {/each}
    </div>
</div>
