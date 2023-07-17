<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let rating = 3; // default rating
    let review = ''; // user input
  
    function submit() {
      // validate input
      if (review.trim() === '') {
        alert('Please enter a review');
        return;
      }
      // dispatch a custom event with the rating and review
      dispatch('submit', { rating, review });
    }
    
    // Define a function to handle the cancel button click
    function cancel() {
      // Hide the review modal
      dispatch('cancel');
    }
  </script>
  
  <div class="overlay fixed inset-0 bg-gray-500 bg-opacity-20">
    <div class="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-8 rounded-lg w-[40rem]">
      <h2 class="text-xl font-bold text-gray-800">Rate your experience</h2>
      <div class="slider mt-4 flex items-center">
        <input type="range" min="1" max="5" bind:value={rating} class="w-50 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        <span class="ml-4 text-lg font-medium text-gray-800">{rating}</span>
      </div>
      <div class="textarea mt-4">
        <label for="review" class="block text-md font-medium text-gray-700">Write a review</label>
        <textarea id="review" bind:value={review} class="mt-2 block w-full h-32 border-2 border-gray-300 rounded-md p-2"></textarea>
      </div>
      <div class="button mt-4 flex justify-end">
        <!-- Add a cancel button -->
        <button on:click={cancel} class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded mr-4">Cancel</button>
        <button on:click={submit} class="bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-2 px-4 rounded">Submit</button>
      </div>
    </div>
  </div>