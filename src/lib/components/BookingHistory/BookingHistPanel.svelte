<script lang="ts">
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
    
    function rateBooking(id: number) {
        // TODO
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
              <button class="ml-4 bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-1 px-4 rounded" type="button" on:click={() => rateBooking(booking.id)}>
                Rate
              </button>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>