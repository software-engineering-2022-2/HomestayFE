<script lang="ts">
    import ManagerLoginModal from "$lib/components/Authen/ManagerLoginModal.svelte";
    import { userDetailStore } from "$lib/stores/stores";
    import { goToManagerBookingRequests } from "$lib/types/utils";
</script>

<ManagerLoginModal on:close={() => goToManagerBookingRequests($userDetailStore.username)}/>