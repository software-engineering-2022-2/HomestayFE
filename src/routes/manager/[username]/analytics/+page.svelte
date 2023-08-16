<script lang="ts">
	import { managerAPI } from "$lib/api/api";
	import ManagerHeader from "$lib/components/NavBar/ManagerHeader.svelte";
	import { onMount } from "svelte";
    import { analyticsListStore, userDetailStore } from "$lib/stores/stores";
	import Analytics from "$lib/components/Manager/Analytics.svelte";

    onMount(async () => {
        try {
            let analytics = await managerAPI.getAnalytics($userDetailStore.username);
            analyticsListStore.set(analytics);
            console.log(analytics);
        } catch (err) {
            console.error(err);
        }
    })
</script>

<div class="relative bg-homestay-bg bg-no-repeat bg-cover bg-opacity-50 min-h-screen min-w-full">
    <ManagerHeader/>
    <Analytics/>
</div>