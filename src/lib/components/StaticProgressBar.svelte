<script lang="ts">
    import { clamp } from "$lib/types/utils";
    export let percentage: number = 1;
    $: normalizedPercentage = Math.round(clamp(percentage, 0, 1) * 100)
</script>


<div class="w-full rounded-full h-3 border-[#41644A] border-[3px] overflow-hidden">
    <div class="bg-[#41644A] h-3" style="width: {normalizedPercentage}%;"></div>
</div>
  