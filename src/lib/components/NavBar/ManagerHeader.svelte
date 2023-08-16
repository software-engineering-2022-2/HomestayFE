<script lang="ts">
	import { goToManagerAnalytics, goToManagerBookingRequests, goToManagerHomestaysDetails } from "$lib/types/utils";
	import ProfileMenu from "../Profile/ProfileMenu.svelte";
    import { userDetailStore } from "$lib/stores/stores";
	import { goto } from "$app/navigation";
</script>

<div class="flex py-4 justify-center items-center bg-[#41644A] text-white">
    <div class="w-[56px]"/>
    <div class="text-2xl font-bold flex flex-grow justify-center items-center">
        Manager Panel
    </div>
    <ProfileMenu/>
</div>

<div class="flex py-2 justify-center items-center bg-[#263A29] text-gray-200 text-lg gap-16">
    <button 
        class="hover:text-white cursor-pointer" 
        on:click={() => goToManagerBookingRequests($userDetailStore.username)}
    >Booking Requests</button>

    <button 
        class="hover:text-white cursor-pointer"
        on:click={() => goToManagerHomestaysDetails($userDetailStore.username)}
    >Homestays Details</button>

    <button 
        class="hover:text-white cursor-pointer"
        on:click={() => goToManagerAnalytics($userDetailStore.username)}
    >Analytics</button>
</div>