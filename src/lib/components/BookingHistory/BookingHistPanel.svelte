<script lang="ts">
  import ReviewModal from "./ReviewModal.svelte";

  // Define the booking object interface
  interface Booking {
    id: number;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
  }

  interface Rating {
    id: number;
    rating: number;
    comment?: string;
  }

  const ratings: Rating[] = [];

  // Define the list of past bookings
  const pastBookings: Booking[] = [
    {
      id: 1111,
      checkIn: new Date(2022, 5, 1),
      checkOut: new Date(2022, 5, 7),
      totalPrice: 500,
    },
    {
      id: 1112,
      checkIn: new Date(2022, 3, 15),
      checkOut: new Date(2022, 3, 22),
      totalPrice: 700,
    },
    {
      id: 1113,
      checkIn: new Date(2021, 10, 1),
      checkOut: new Date(2021, 10, 8),
      totalPrice: 600,
    },
  ];

  let selectedBooking: Booking | null = null;

  function rateBooking(booking: Booking) {
    selectedBooking = booking;
  }

  // Define a function to handle the submit event from the review modal
  function handleSubmit(event: { detail: { rating: number; review?: string } }) {
    try {
      // Get the rating and review from the event detail
      const { rating, review } = event.detail;

      // Push a new rating object to the ratings array
      ratings.push({
        id: selectedBooking!.id,
        rating,
        comment: review,
      });

      // Show a confirmation message to the user
      alert('Thank you for your rating and review!');

      // Reset the selected booking to null
      selectedBooking = null;
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('An error occurred while submitting your rating. Please try again later.');
    }
  }

  function handleCloseModal(event: { type: string }) {
    if (event.type === 'cancel') {
      selectedBooking = null;
    }
  }
</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 border-b border-gray-200 flex justify-center">
      <h3 class="text-xl leading-6 text-gray-900">Booking History</h3>
    </div>
    <ul class="divide-y divide-gray-200">
      {#each pastBookings as booking}
        <li class="px-4 py-5 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex items-center">
                <h4 class="text-lg font-medium leading-6 text-gray-900">#{booking.id}</h4>
                <span class="ml-3 text-md font-medium text-gray-500">{booking.checkIn.toLocaleDateString()} - {booking.checkOut.toLocaleDateString()}</span>
              </div>
              <div class="mt-1 text-md text-gray-500">
                <span class="font-medium text-gray-700">Total: </span>
                <span class="font-medium text-green-500">${booking.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button class="ml-4 bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-1 px-4 rounded" type="button" on:click={() => rateBooking(booking)}>
              Rate
            </button>

            <!-- Add a conditional rendering for the review modal -->
            {#if selectedBooking === booking}
              <!-- Pass the handle submit function as a prop to the review modal -->
              <ReviewModal on:submit={handleSubmit} on:cancel={handleCloseModal} />
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>