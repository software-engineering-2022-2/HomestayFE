<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    let showModal = false;
  
    function toggleModal() {
      showModal = !showModal;
    }
  </script>
  
  <div class="inline-block relative">
    <button
      class="text-[#E86A33] hover:text-[#FF8C66] focus:outline-none"
      on:click={toggleModal}
    >
    <iconify-icon class="text-md" icon="material-symbols:info-outline"></iconify-icon>
    </button>
  
    {#if showModal}
      <div class="fixed inset-0 z-10 flex items-center justify-center">
        <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div class="z-20 w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h2 class="uppercase tracking-wide text-lg font-medium mb-4">Deposit Information</h2>
          <p class="text-gray-700 text-base">
            This is the amount you need to pay in advance to secure your reservation.
          </p>
          <button
            class="mt-4 py-2 px-4 bg-[#E86A33] text-white rounded-lg hover:bg-[#FF8C66] focus:outline-none"
            on:click={toggleModal}
          >
            Close
          </button>
        </div>
      </div>
    {/if}
  </div>