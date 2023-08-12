<script lang="ts">
    import LoginModal from "$lib/components/Authen/LoginModal.svelte";
    import { userDetailStore } from "$lib/stores/stores";
    import { goToManagerBookingRequests } from "$lib/types/utils";
</script>

<LoginModal on:close={() => goToManagerBookingRequests($userDetailStore.username)}/>