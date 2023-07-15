<script>
  import { createEventDispatcher } from 'svelte';
  import { authAPI } from '$lib/api/api';

  const dispatch = createEventDispatcher();

  let email = '';
  let password = '';
  let confirmPassword = '';

  async function handleSubmit() {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      dispatch('close');
      return;
    }

    // You can add your sign-up logic here
    // ...
    let registerResult = await authAPI.userRegister(email, password);
    if (!registerResult){
      alert(`Register failed because account ${email} exists!`);
      dispatch('close');
      return;
    }

    // Dispatch the "close" event to close the modal
    dispatch('close');
  }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-lg shadow-lg p-6 w-full md:w-2/3 lg:w-1/2">

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-700">Sign Up</h2>
      <button on:click={() => dispatch('close')}>
        <iconify-icon class="text-3xl text-[#41644A] hover:text-[#263A29]" icon='zondicons:close-solid'></iconify-icon>
      </button>
    </div>

    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-6">
        <label class="block text-lg font-bold mb-2 text-gray-700" for="email-input">
          Username:
        </label>
        <input class="w-full py-2 px-3 rounded border border-gray-300 text-lg text-gray-700" 
          type="text" id="email-input" bind:value={email} required />
      </div>
      <div class="mb-6">
        <label class="block text-lg font-bold mb-2 text-gray-700" for="password-input">
          Password:
        </label>
        <input class="w-full py-2 px-3 rounded border border-gray-300 text-lg text-gray-700" 
          type="password" id="password-input" bind:value={password} required />
      </div>
      <div class="mb-6">
        <label class="block font-bold mb-2 text-lg text-gray-700" for="confirm-password-input">
          Confirm Password:
        </label>
        <input class="w-full py-2 px-3 rounded border border-gray-300 text-lg text-gray-700" 
          type="password" id="confirm-password-input" bind:value={confirmPassword} required />
      </div>
      <div class="flex justify-center">
        <button class="bg-[#41644A] hover:bg-[#263A29] text-lg text-white font-bold py-2 px-12 rounded" type="submit">
          Sign Up
        </button>
      </div>
    </form>
    
  </div>
</div>