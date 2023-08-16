<script lang="ts">
    import { homestayListStore } from "$lib/stores/stores";
	  import type { HomestayInfo } from "$lib/types/types";
    import HomestayModal from "./HomestayModal.svelte";
    
    let showModal = false;
    let modalHomestay: HomestayInfo | null;
  
    function showHomestayModal(homestay: HomestayInfo) {
      showModal = true;
      modalHomestay = homestay;
    }
    
    function closeHomestayModal() {
      showModal = false;
      modalHomestay = null;
    }
  </script>
  
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 border-b border-gray-200 flex justify-center">
        <h3 class="text-xl leading-6 text-gray-800">Homestay Details</h3>
      </div>
      <ul class="divide-y divide-gray-200">
        {#if $homestayListStore && $homestayListStore.length > 0}
          {#each $homestayListStore as homestay}
            <li class="px-4 py-5 sm:px-6">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-lg">{homestay.name}</div>
                  <div class="text-md text-gray-600">Available: 
                    {#if homestay.availability} 
                      <span class="text-green-600">True</span>
                    {:else}
                      <span class="text-red-600">False</span>
                    {/if}
                  </div>
                </div>
                <button 
                  class="ml-4 text-blue-500 border-blue-500 border-2 text-lg py-0.5 px-4 rounded-md"
                  on:click={() => showHomestayModal(homestay)}
                >More Info</button>
              </div>
            </li>
          {/each}
        {:else}
          <div class="px-4 py-5 sm:px-6">
            <p class="text-lg text-gray-500 text-center">List your first homestay for rent <a class="underline text-blue-500" href="/homestay">here</a>!</p>
          </div>
        {/if}
      </ul>
    </div>
    {#if showModal && modalHomestay != null}
      <HomestayModal homestay={modalHomestay} on:closeModal={closeHomestayModal} />
    {/if}
  </div>

