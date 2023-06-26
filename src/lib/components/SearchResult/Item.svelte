<script>
	import 'resize-observer-polyfill/dist/ResizeObserver.global';
	const images = ['/homestay1.jpg', '/homestay2.jpg', '/homestay3.jpg', '/homestay4.jpg'];
	import Carousel from 'svelte-carousel';
	import Star from '../Star.svelte';
	import { StarType } from '$lib/types/types';
	import CustomDot from './CustomDot.svelte';
</script>

<div
	class="flex flex-col space-y-[0.75rem] min-h-[23.75rem] min-w-[17.5rem] rounded-xl overflow-hidden relative"
>
	<Carousel let:loaded let:currentPageIndex let:pagesCount let:showPage arrows={false}>
		<div slot="dots" class="w-full absolute top-[13rem] flex flex-row justify-between items-baseline px-3">
			<div class="basis-1/3"><iconify-icon class="text-5xl bg-white rounded-full" icon="healthicons:ui-user-profile"></iconify-icon></div>
			<div class="flex flex-row space-x-[0.5rem] basis-1/3 justify-center">
				{#each Array(pagesCount) as _, pageIndex (pageIndex)}
					<CustomDot
						symbol={pageIndex + 1}
						active={currentPageIndex === pageIndex}
						on:click={() => showPage(pageIndex)}
					/>
				{/each}
			</div>
			<div class="basis-1/3" />
		</div>
		{#each images as src, imageIndex (src)}
			<div class="img-container min-w-[17.5rem] min-h-[16.5rem]">
				{#if loaded.includes(imageIndex)}
					<img class="w-full h-full object-cover" {src} alt="" />
				{/if}
			</div>
		{/each}
	</Carousel>
	<div class="flex flex-col">
		<div class="flex flex-row">
			<div class="grow font-bold text-[1.125rem]">Hoan Kiem, Hanoi</div>
			<div class="grow-0"><Star starType={StarType.FULL} /></div>
			<div class="grow-0 text-[#E86A33]">4.9</div>
		</div>
		<div class="text-[#777] text-[1.125rem]">Stay with Long Hoang · SuperHost</div>
		<div class="text-[#777] text-[1.125rem]">Jun 20 - 25</div>
		<div><span class="font-bold">$50</span> night</div>
	</div>
</div>
