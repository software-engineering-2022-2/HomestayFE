<script lang="ts">
    import type { StarType } from "$lib/types/types";
    export let starType: StarType;
    export let className = "";
</script>

{#if starType === 'full'}
    <iconify-icon class="text-[#E86A33] {className}" icon="ant-design:star-filled"></iconify-icon>
{:else if starType === 'half'}
    <iconify-icon class="text-[#E86A33] {className}" icon="fluent:star-half-20-regular"></iconify-icon>
{:else} 
    <iconify-icon class="text-[#E86A33] {className}" icon="ant-design:star-outlined"></iconify-icon>
{/if}