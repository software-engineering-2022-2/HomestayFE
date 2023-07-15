<script lang="ts">
    import BookingPage from "$lib/views/BookingPage.svelte";
    import type { PageData } from './$types';
    import { setContext } from "svelte";

    export let data: PageData;
    setContext("homestayServices", data.serviceInfo)
    setContext("homestayInfo", data.homestayInfo);
    setContext("managerInfo", data.managerInfo);
</script>

<BookingPage/>