<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let password = ''; 
    let passwordConfirm = '';
    let newPassword = '';
  
    function submit() {
      if (passwordConfirm !== password){
        alert("Password confirm does not match!\n");
        return;
      }
      // dispatch a custom event with the rating and review
      dispatch('submit', { password, newPassword });
      password = '';
      passwordConfirm = '';
      newPassword = '';
    }
    
    // Define a function to handle the cancel button click
    function cancel() {
      // Hide the review modal
      dispatch('cancel');
      password = '';
      passwordConfirm = '';
      newPassword = '';
    }
  </script>
  
  <!-- Add a div element to cover the whole window -->
  <div class="overlay fixed inset-0 bg-black bg-opacity-50">
    <!-- Add some style to the modal to make it centered and visible -->
    <!-- Increase the width to 40rem -->
    <div class="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-8 rounded-lg w-[40rem]">
      <h2 class="text-xl font-bold text-gray-800">Rate your experience</h2>
      <div class="mt-4">
        <div>Password</div>
        <input type="password" bind:value={password}>
      </div>
      <div class="mt-4">
        <div>Password Confirm</div>
        <input type="password" bind:value={passwordConfirm}>
      </div>
      <div class="mt-4">
        <div>New Password</div>
        <input type="password" bind:value={newPassword}>
      </div>
      <div class="button mt-4 flex justify-end">
        <!-- Add a cancel button -->
        <button on:click={cancel} class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded mr-4">Cancel</button>
        <button on:click={submit} class="bg-[#E86A33] hover:bg-[#FF8C66] text-white font-medium py-2 px-4 rounded">Submit</button>
      </div>
    </div>
  </div>