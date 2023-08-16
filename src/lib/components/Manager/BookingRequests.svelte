<script lang="ts">
  import { bookingHistStore } from "$lib/stores/stores";
  import { userDetailStore } from "$lib/stores/stores";
  import { bookingAPI } from "$lib/api/api";

  async function updateBookingStatus(bookingID: number, status: string) {
    try {
      if (confirm("Do you want to proceed?")) {
        let res = await bookingAPI.updateBookingStatus($userDetailStore.username, bookingID, status);
        console.log(res);
        alert("Updated booking status successfully.");
        location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update booking status.");
    }
  }

  function showReview(comment: string | undefined, rating: number | undefined) {
      alert("Comment: " + comment + "\nRating: " + rating);
  }

</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <div class="px-2 py-5 border-b border-gray-200 flex justify-center">
      <h3 class="text-xl leading-6 text-gray-800">Booking Requests</h3>
    </div>
    <ul class="divide-y divide-gray-200">
      {#if $bookingHistStore && $bookingHistStore.length > 0}
        {#each $bookingHistStore as booking}
          <li class="px-2 py-5 sm:px-6">
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
              
              {#if booking.status.toLocaleLowerCase() === "pending"}
              <div class="ml-4 text-orange-500 underline text-lg py-1 px-2">
                Pending
              </div>
              <button on:click={() => updateBookingStatus(booking.id, "Confirmed")} class="ml-4 text-blue-500 border-blue-500 border-2 font-medium py-1 px-2 rounded">
                Confirm
              </button>
              <button on:click={() => updateBookingStatus(booking.id, "Cancelled")} class="ml-4 text-gray-500 border-gray-500 border-2 font-medium py-1 px-2 rounded">
                Cancel
              </button>
              
              {:else if booking.status.toLowerCase() === "cancelled" || booking.status.toLowerCase() === "canceled"}
              <div class="ml-4 text-gray-500 border-gray-500 underline text-lg py-1 px-2">
                Cancelled
              </div>
              
              {:else if booking.status.toLocaleLowerCase() === "confirmed"}
              <div class="ml-4 text-blue-500 border-blue-500 underline text-lg py-1 px-2">
                Confirmed
              </div>
              <button on:click={() => updateBookingStatus(booking.id, "Completed")} class="ml-4 text-green-500 border-green-500 border-2 font-medium py-1 px-2 rounded">
                Complete
              </button>
              <button on:click={() => updateBookingStatus(booking.id, "Cancelled")} class="ml-4 text-gray-500 border-gray-500 border-2 font-medium py-1 px-2 rounded">
                Cancel
              </button>
              
              {:else if booking.status.toLowerCase() === "completed"}
                <div class="ml-4 text-green-500 border-green-500 underline text-lg py-1 px-2">
                  Completed
                </div>
                {#if !booking.rating}
                  <div class="ml-4 text-gray-500 border-gray-500 border-2 font-medium py-1 px-2 rounded">
                    No review
                  </div>
                {:else}
                  <button on:click={() => showReview(booking.comment, booking.rating)} class="ml-4 text-orange-600 border-orange-600 border-2 font-medium py-1 px-2 rounded">
                    See review
                  </button>
                {/if}
              {/if}

            </div>
          </li>
        {/each}
      {:else}
        <div class="px-2 py-5 sm:px-6">
          <p class="text-lg text-gray-500 text-center">There are currently no booking request. Come back later!</p>
        </div>
      {/if}
    </ul>
  </div>
</div>