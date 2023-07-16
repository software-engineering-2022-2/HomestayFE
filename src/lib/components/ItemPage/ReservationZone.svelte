<script lang="ts">
	import { homestayInfo } from '$lib/stores/stores';

	import Flatpickr from 'svelte-flatpickr';

	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/material_green.css';
	import { goto } from '$app/navigation';
	import { bookingPeriod } from '$lib/stores/stores';

	async function goToBooking(){
		goto(`/homestay/${$homestayInfo.id}/booking`)
	}

	const flatpickrOptions = {};
</script>

<div
	class="w-full px-5 py-8 bg-white"
	style="box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.25);border-radius: 24px;"
>
	<div
		class="flex flex-row pb-3 border-b-[#777777] border-b-[1.8px] text-[#E86A33] font-lato font-bold text-2xl after:content-['night'] after:text-black after:font-normal after:ml-2"
	>
		<!-- ${dollarPerNight.toString()} -->
		${$homestayInfo.price}
	</div>

	<div class="grid grid-cols-2 py-3" style="max-width: 600px;">
		<div class="flex flex-col">
			<div class="font-lato text-xl">5 night</div>
			<div class="text-[#555555] text-xl">Jun 15, 2023 - Jun 20, 2023</div>
		</div>
		<div class="grid grid-cols-2 rounded-xl border-2 border-[#555555] justify-items-center">
			<div class="flex pl-3 py-3 flex-col w-full border-r border-r-[#555555]">
				<div class="font-bold text-md font-lato">CHECK-IN</div>
				<Flatpickr options={flatpickrOptions} bind:value={$bookingPeriod.checkin_date} element="#booking_checkin">
					<div class="flatpickr" id="booking_checkin">
						<input type="text" class="w-full" data-input />
					</div>
				</Flatpickr>
			</div>
			<div class="flex pl-3 py-3 flex-col w-full border-l border-l-[#555555]">
				<div class="font-bold text-md font-lato">CHECK-OUT</div>
				<Flatpickr options={flatpickrOptions} bind:value={$bookingPeriod.checkout_date} element="#booking_checkout">
					<div class="flatpickr" id="booking_checkout">
						<input type="text" class="w-full" data-input />
					</div>
				</Flatpickr>
			</div>
		</div>
	</div>
	
	<div class="flex flex-row justify-end items-center space-x-5 mt-7">
		<button class="text-[#555555] text-xl underline underline-offset-4">Clear dates</button>
		<button on:click={goToBooking} class="text-xl py-2 px-10 rounded-xl bg-[#41644A] font-bold text-white">Reserve</button>
	</div>
</div>