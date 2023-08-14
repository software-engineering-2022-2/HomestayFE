<script lang="ts">
	import { managerAPI } from "$lib/api/api";
	import HomestaysDetails from "$lib/components/Manager/HomestaysDetails.svelte";
    import ManagerHeader from "$lib/components/NavBar/ManagerHeader.svelte";
	import { onMount } from "svelte";
    import { userDetailStore, homestayListStore } from "$lib/stores/stores";

    onMount(async () => {
        try {
            let homestays = await managerAPI.getAllHomestaysOwned($userDetailStore.id);
            homestayListStore.set(homestays);
            console.log($homestayListStore);
        } catch (err) {
            console.error(err);
        }
    });
</script>

<div class="relative bg-homestay-bg bg-no-repeat bg-cover bg-opacity-50 min-h-screen min-w-full">
    <ManagerHeader/>
    <HomestaysDetails/>
</div>