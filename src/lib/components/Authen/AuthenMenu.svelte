<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import SignUpModal from './SignUpModal.svelte';
  import LoginModal from './LoginModal.svelte';

  let showDropdown = false;
  let dropdownRef: HTMLElement;
  let showSignUpModal = false;
  let showLoginModal = false;

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

  function signUp() {
    showDropdown = false;
    showSignUpModal = true;
  }

  function closeSignUpModal() {
    showSignUpModal = false;
  }

  function login() {
    showDropdown = false;
    showLoginModal = true;
  }

  function closeLoginModal() {
    showLoginModal = false;
  }
</script>

<div class="relative" bind:this={dropdownRef}>
  <button class="ml-4" on:click={toggleDropdown}>
    <iconify-icon class="text-4xl" icon='mingcute:menu-fill'></iconify-icon>
  </button>

  {#if showDropdown}
    <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div class="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button class="block px-4 py-2 text-lg text-gray-700 font-bold hover:bg-gray-100" role="menuitem" on:click={signUp}>Sign up</button>
        <button class="block px-4 py-2 text-lg text-gray-700 font-bold hover:bg-gray-100" role="menuitem" on:click={login}>Log in</button>
      </div>
    </div>
  {/if}

  {#if showSignUpModal}
    <SignUpModal on:close={closeSignUpModal} />
  {/if}

  {#if showLoginModal}
    <LoginModal on:close={closeLoginModal} />
  {/if}
  
</div>