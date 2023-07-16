<script>
	import BookingHistory from "$lib/views/BookingHistory.svelte";
	import { bookingAPI } from "$lib/api/api";
	import { onMount } from "svelte";
	import { userDetailStore, bookingHistStore } from "$lib/stores/stores";
  
	onMount(async () => {
	  try {
		let bookingHist = await bookingAPI.getBookingHistory($userDetailStore.username);
		bookingHistStore.set(bookingHist);
	  } catch (err) {
		console.error(err);
	  }
	});
  </script>
  
  <BookingHistory />