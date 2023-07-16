<script lang="ts">
  import { bookingHistStore } from "$lib/stores/stores";
  import { userDetailStore } from "$lib/stores/stores";
  import { bookingAPI } from "$lib/api/api";
	import ReviewModal from "./ReviewModal.svelte";

  let showReviewPanel = false;
  let currentBookingID: number = -1;

  function toggleReview(bookingID: number) {
    currentBookingID = bookingID;
    showReviewPanel = !showReviewPanel;
  }

  async function cancelBooking(bookingID: number) {
    try {
      if (confirm("Are you sure you want to cancel this booking?")) {
        let res = await bookingAPI.cancelBooking($userDetailStore.username, bookingID);
        alert("Booking cancelled successfully.");
        location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking.");
    }
  }

  async function submitReview(event: { detail: { rating: number; review: string } }) {
    try {
      const { rating, review } = event.detail;
      await bookingAPI.reviewBooking($userDetailStore.username, currentBookingID, review, rating);
      alert("Review submitted successfully.");
      location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to submit booking.");
    }
  }

  function showReview(comment: string | undefined, rating: number | undefined) {
      alert("Comment: " + comment + "\nRating: " + rating);
  }

</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 border-b border-gray-200 flex justify-center">
      <h3 class="text-xl leading-6 text-gray-800">Booking History</h3>
    </div>
    <ul class="divide-y divide-gray-200">
      {#if $bookingHistStore}
        {#each $bookingHistStore as booking}
          <li class="px-4 py-5 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center">
                  <h4 class="text-lg font-medium leading-6 text-gray-900">#{booking.id}</h4>
                  <span class="ml-3 text-md font-medium text-gray-500">{booking.checkin_date} → {booking.checkout_date}</span>
                </div>
                <div class="mt-1 text-md text-gray-500">
                  <span class="font-medium text-gray-700">Total: </span>
                  <span class="font-medium text-blue-500">{booking.total_price.toLocaleString('en-US', { maximumFractionDigits: 0 })} VND</span>
                </div>
              </div>
              {#if booking.status === "Pending"}
                <button on:click={() => cancelBooking(booking.id)} class="ml-4 text-gray-500 border-gray-500 border-2 font-medium py-1 px-4 rounded">
                  Cancel
                </button>
                <div class="ml-4 text-orange-500 underline text-lg py-1 px-4">
                  {booking.status}
                </div>
              {:else if booking.status === "cancelled"}
                <div class="ml-4 text-gray-500 border-gray-500 underline text-lg py-1 px-4">
                  Cancelled
                </div>
              {:else if booking.status === "completed"}
                {#if !booking.rating}
                  <button on:click={() => toggleReview(booking.id)} class="ml-4 text-green-600 border-green-600 border-2 font-medium py-1 px-4 rounded">
                    Review
                  </button>
                {:else}
                  <button on:click={() => showReview(booking.comment, booking.rating)} class="ml-4 text-gray-400 border-gray-400 border-2 font-medium py-1 px-4 rounded">
                    Reviewed
                  </button>
                {/if}
                <div class="ml-4 text-blue-500 border-blue-500 underline text-lg py-1 px-4">
                  Completed
                </div>
                {#if showReviewPanel}
                  <ReviewModal on:cancel={()=> toggleReview(-1)} on:submit={submitReview}></ReviewModal>
                {/if}
              {/if}
            </div>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>