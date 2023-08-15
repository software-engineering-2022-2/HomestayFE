<script lang="ts">
    import ManagerHeader from "$lib/components/NavBar/ManagerHeader.svelte";
	import BookingRequests from "$lib/components/Manager/BookingRequests.svelte";
    import { onMount } from "svelte";
    import { bookingAPI } from "$lib/api/api";
    import { userDetailStore, bookingHistStore } from "$lib/stores/stores";

    onMount(async () => {
	  try {
		let bookingHist = await bookingAPI.getBookingHistory($userDetailStore.username);
		console.log(bookingHist);
		bookingHistStore.set(bookingHist);
	  } catch (err) {
		console.error(err);
	  }
	});
</script>

<div class="relative bg-homestay-bg bg-no-repeat bg-cover bg-opacity-50 min-h-screen min-w-full">
    <ManagerHeader/>
    <BookingRequests/>
</div>

