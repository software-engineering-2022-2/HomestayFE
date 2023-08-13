<script lang="ts">
	import type { HomestayInfo, IService, IBookingService, BookingPeriod } from '$lib/types/types';
	import MoreInfo from './MoreInfo.svelte';
	import { getContext } from 'svelte';
	import { userDetailStore } from '$lib/stores/stores';
	import { get } from 'svelte/store';
	import { reserveBookingInfo } from '$lib/stores/stores';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/material_green.css';
	import { clamp, getTomomorowOfDate } from '$lib/types/utils';
	import { bookingAPI } from '$lib/api/api';
	import { SimpleError, UnauthorizedError } from '$lib/api/exception';
	import { goto } from '$app/navigation';
	import {
		formatDate,
		findFarthestPossibleDate,
		getDaysDiff,
		getSericesPrice
	} from '$lib/types/utils';
	import { reloadStore } from '$lib/stores/reload';

	const homestayInfo: HomestayInfo = getContext('homestayInfo');
	const homestayServices: IService[] = getContext('homestayServices');
	const bookingPeriods = getContext('homestayBookedDates') as BookingPeriod[];
	const bookingServices: IBookingService[] = homestayServices.map((service) => ({
		...service,
		checked: false
	}));

	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	$: tomorrowCheckinDate = getTomomorowOfDate(new Date($reserveBookingInfo.checkin_date));
	$: minDatePossible = formatDate(tomorrowCheckinDate);
	$: maxDatePossible = findFarthestPossibleDate($reserveBookingInfo.checkin_date, bookingPeriods);

	$: flatpickrOptionsCheckin = {
		minDate: formatDate(tomorrow),
		dateFormat: 'Y-m-d',
		altInput: true,
		altFormat: 'Y-m-d',
		disable: bookingPeriods
	};
	$: flatpickrOptionsCheckout = {
		minDate: minDatePossible,
		maxDate: maxDatePossible,
		dateFormat: 'Y-m-d',
		altInput: true,
		altFormat: 'Y-m-d'
	};
	$: periodDays = getDaysDiff($reserveBookingInfo.checkin_date, $reserveBookingInfo.checkout_date);
	$: servicesPrice = getSericesPrice(bookingServices);
	$: totalPrice = Math.round(periodDays * homestayInfo.price + servicesPrice);
	$: depositAmount = Math.round(totalPrice * homestayInfo.pricing_config.deposit_percentage);

	function validateInformation() {
		if (!$reserveBookingInfo.checkin_date || !$reserveBookingInfo.checkout_date) return false;
		const startDate = new Date($reserveBookingInfo.checkin_date);
		const endDate = new Date($reserveBookingInfo.checkout_date);
		if (startDate >= endDate) return false;
		if ($reserveBookingInfo.num_adults <= 0) return false;
		return true;
	}

	async function reserveHomestay() {
		if (!validateInformation()) {
			alert('Validate information Failed');
			return;
		}
		console.log(get(reserveBookingInfo));

		try {
			await bookingAPI.reserveHomestay(
				homestayInfo.id,
				$userDetailStore.username,
				get(reserveBookingInfo),
				bookingServices
			);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				alert(error);
				reloadStore.set(true)
				return;
			}
			if (error instanceof SimpleError) {
				alert(error);
				return;
			}
		}
		alert('Booking success!');
		goto(`/booking-history/${$userDetailStore.username}`);
	}
</script>

<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
	<div class="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
		<div class="-mx-3 md:flex mb-6">
			<div class="md:w-full px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					for="grid-first-name"
				>
					Homestay Name
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-first-name"
					type="text"
					placeholder={homestayInfo.name}
					disabled
				/>
			</div>
		</div>
		<div class="-mx-3 md:flex mb-6">
			<div class="md:w-1/2 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					for="grid-checkin-date"
				>
					Check-in date
				</label>
				<Flatpickr
					options={flatpickrOptionsCheckin}
					bind:value={$reserveBookingInfo.checkin_date}
					element="#checkin"
				>
					<div class="flatpickr" id="checkin">
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-checkin-date"
							type="text"
							placeholder="Check-in date"
							data-input
						/>
					</div>
				</Flatpickr>
			</div>
			<div class="md:w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					for="grid-checkout-date"
				>
					Check-out date
				</label>
				<Flatpickr
					options={flatpickrOptionsCheckout}
					bind:value={$reserveBookingInfo.checkout_date}
					element="#checkout"
				>
					<div class="flatpickr" id="checkout">
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-checkout-date"
							type="text"
							placeholder="Check-out date"
							data-input
						/>
					</div>
				</Flatpickr>
			</div>
		</div>
		<div class="-mx-3 md:flex mb-6">
			<div class="md:w-1/2 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					for="grid-adults"
				>
					Adults
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-adults"
					type="number"
					placeholder="0"
					max={homestayInfo.max_num_adults}
					min={0}
					bind:value={$reserveBookingInfo.num_adults}
				/>
			</div>
			<div class="md:w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					for="grid-children"
				>
					Children
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-children"
					type="number"
					placeholder="0"
					max={homestayInfo.max_num_children}
					min={0}
					bind:value={$reserveBookingInfo.num_children}
				/>
			</div>
		</div>
		<div class="-mx-3 md:flex mb-6">
			<div class="md:w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					for="grid-services"
				>
					Additional services
				</label>
				<div class="grid grid-cols-2 gap-2">
					{#each bookingServices as service}
						{#if service.availability}
							<label class="inline-flex items-center">
								<input
									type="checkbox"
									class="form-checkbox h-5 w-5 text-gray-600"
									name={service.service_type.name}
									value={service.id}
									bind:checked={service.checked}
								/>
								<span class="ml-2 text-gray-700">{service.service_type.name}</span>
								<span class="ml-2 text-orange-500">{service.price.toLocaleString('en-US', { maximumFractionDigits: 0 })} VND</span>
							</label>
						{/if}
					{/each}
					<!-- add more services here -->
				</div>
			</div>
		</div>
		<div class="-mx-3 md:flex mb-2">
			<div class="px-3">
				<label
					class="uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					for="grid-total-price"
				>
					Total price:
				</label>
			</div>
			<div class="text-gray-700 text-md font-bold mb-2 px-3">
				<!-- call API here -->
				{totalPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })} VND
			</div>
		</div>
		<div class="-mx-3 md:flex mb-6">
			<div class="px-3">
				<label class="tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-total-price">
					DEPOSIT<MoreInfo />:
				</label>
			</div>
			<div class="text-[#E86A33] text-md font-bold mb-2 px-3">
				<!-- call API here -->
				{depositAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })} VND
			</div>
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-2 px-4 rounded"
				type="button"
				on:click={reserveHomestay}
			>
				Order
			</button>
			<button
				class="bg-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded"
				type="button"
			>
				Cancel
			</button>
		</div>
	</div>
</div>
