<script lang="ts">
    import BookingPage from "$lib/views/BookingPage.svelte";
    import type { PageData } from './$types';
    import { setContext } from "svelte";
    import { afterNavigate } from "$app/navigation";
    import { goto } from "$app/navigation";
    import { userDetailStore } from "$lib/stores/stores";

    afterNavigate(async ({ from }) => {
        if ($userDetailStore.username === "") {
            if (from && from.url ) {
                alert("Please log in")
                goto(from.url)
            }
            else goto('/')
            return;
        }
    });

    export let data: PageData;
    setContext("homestayServices", data.serviceInfo)
    setContext("homestayInfo", data.homestayInfo);
    setContext("managerInfo", data.managerInfo);
</script>

<BookingPage/>