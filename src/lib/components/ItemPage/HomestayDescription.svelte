<script lang="ts">
	export let className = '';
	import { homestayInfo } from "$lib/stores/stores";
</script>

<div class="flex flex-col space-y-[6px] {className}">
	<div class="font-[400] font-lato text-2xl">Description</div>
	<div class="text-xl text-[#555555] font-lato">{$homestayInfo.description}</div>
</div>
