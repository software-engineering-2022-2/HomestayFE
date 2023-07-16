<script lang="ts">
    import ItemPage from "$lib/views/ItemPage.svelte";
    import type { PageData } from './$types';
    import { homestayInfo, managerInfo } from "$lib/stores/stores";
    import { setContext } from "svelte";

    export let data: PageData;

    homestayInfo.set(data.homestayInfo);
    managerInfo.set(data.managerInfo);
    setContext("homestayServices", data.serviceInfo)
    setContext("homestayBookedDates", data.bookedDates)

</script>

<ItemPage></ItemPage>