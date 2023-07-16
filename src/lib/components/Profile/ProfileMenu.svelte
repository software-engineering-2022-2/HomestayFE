<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { goto } from "$app/navigation";
    import { userDetailStore } from '$lib/stores/stores';
    import { get } from 'svelte/store';
    import { reloadStore } from '$lib/stores/reload';
    import { BACKEND_MEDIA_URL } from '$lib/api/api';

    let showDropdown = false;
    let dropdownRef: HTMLElement;
  
    function toggleDropdown() {
      showDropdown = !showDropdown;
    }
  
    function closeDropdown() {
      showDropdown = false;
    }
  
    onMount(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('click', handleOutsideClick);
      }
    });
  
    onDestroy(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', handleOutsideClick);
      }
    });
  
    function handleOutsideClick(event: MouseEvent) {
      if (dropdownRef && !dropdownRef.contains(event.target as HTMLElement)) {
        closeDropdown();
      }
    }
  
    function profile() {
      showDropdown = false;
      goto(`/profile/${get(userDetailStore).username}`)
    }
  
    function logout() {
      showDropdown = false;
      const confirmed = confirm("Are you sure you want to log out?");
      if (confirmed) {
          reloadStore.set(true);
          goto(`/`);
      }
    } 

    function bookingHist() {
      goto(`/booking-history/${get(userDetailStore).username}`);
    }

  </script>
  
  <div class="relative" bind:this={dropdownRef}>
    <button on:click={toggleDropdown}>
      {#if $userDetailStore && $userDetailStore.avatar}
        <div class="px-4"><img class="w-[2rem] h-[2rem] object-cover rounded border-white border-2" alt="" src={`${BACKEND_MEDIA_URL}/${$userDetailStore.avatar}`}></div>
      {:else}
        <iconify-icon class="text-4xl px-4" icon="healthicons:ui-user-profile"></iconify-icon>
      {/if }
    </button>
  
    {#if showDropdown}
      <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
        <div class="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <button class="block px-4 py-2 text-lg text-gray-700 font-bold hover:bg-gray-100" role="menuitem" on:click={profile}>Profile</button>
          <button class="block px-4 py-2 text-lg text-gray-700 font-bold hover:bg-gray-100" role="menuitem" on:click={bookingHist}>Booking history</button>
          <button class="block px-4 py-2 text-lg text-gray-700 font-bold hover:bg-gray-100" role="menuitem" on:click={logout}>Log out</button>
        </div>
      </div>
    {/if}
    
  </div>