<script lang="ts">
    export let className = ""
</script>

<div class="flex flex-col space-y-[6px] {className}">
	<div class="font-[400] text-2xl font-lato">What this place offer</div>
    <div class="grid grid-rows-3 grid-flow-col">
        <div class="flex flex-row space-x-5">
            <iconify-icon class="text-2xl text-[#41644A]" icon="icon-park:wifi"></iconify-icon>
            <div class="text-xl font-lato">Free wifi</div>
        </div>
        <div class="flex flex-row space-x-5">
            <iconify-icon class="text-2xl text-[#41644A]" icon="mdi:television-box"></iconify-icon>
            <div class="text-xl font-lato">Television</div>
        </div>
        <div class="flex flex-row space-x-5">
            <iconify-icon class="text-2xl text-[#41644A]" icon="material-symbols:bathtub"></iconify-icon>
            <div class="text-xl font-lato">Bathtub</div>
        </div>
    </div>
</div>
