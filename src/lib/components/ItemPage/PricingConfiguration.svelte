<script lang="ts">
	import StaticProgressBar from "../StaticProgressBar.svelte";
    import type { PricingConfig } from "$lib/types/types";

    import { clamp } from "$lib/types/utils";

    let priceConfig: PricingConfig = {
        depositPercentage: 0.3,
        freeCancelationDays: 5,
        cancelationRefund: 0.5
    }

    $: normalizedPriceConfig  = {
        depositPercentage: Math.round(clamp(priceConfig.depositPercentage, 0 , 1) * 100),
        freeCancelationDays: priceConfig.freeCancelationDays,
        cancelationRefund: Math.round(clamp(priceConfig.cancelationRefund, 0 , 1) * 100)
    }

	export let className = '';
</script>

<div class="flex flex-col space-y-[6px] {className}">
	<div class="font-[400] text-2xl font-lato">Price Configuration</div>
    <div class="grid grid-cols-3 items-center gap-y-5 gap-x-6">
        <div class="text-[#E86A33] text-xl font-lato">Deposit Percentage</div>
        <StaticProgressBar percentage={priceConfig.depositPercentage}></StaticProgressBar>
        <div class="font-lato text-[#555555] text-xl font-[700]">{normalizedPriceConfig.depositPercentage}%</div>
        
        <div class="text-[#E86A33] text-xl font-lato">Free Cancelation Days</div>
        <StaticProgressBar percentage={normalizedPriceConfig.freeCancelationDays / 7}></StaticProgressBar>
        <div class="font-lato text-[#555555] text-xl font-[700]">{normalizedPriceConfig.freeCancelationDays} days</div> 
        
        <div class="text-[#E86A33] text-xl font-lato">Cancelation Refund</div>
        <StaticProgressBar percentage={priceConfig.cancelationRefund}></StaticProgressBar>
        <div class="font-lato text-[#555555] text-xl font-[700]">{normalizedPriceConfig.cancelationRefund}%</div>
    </div>
</div>
