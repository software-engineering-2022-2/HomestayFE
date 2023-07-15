<script lang="ts">
    import "../app.css";
    
    import 'iconify-icon'

    import { tokens } from '$lib/api/headers';
    import { get } from 'svelte/store';
    import { userAPI } from '$lib/api/api';
    import { userDetailStore, clearUserDetailStore } from "$lib/stores/stores";
    import { clearTokens } from "$lib/api/headers";
	import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { reloadStore } from "$lib/stores/reload";
	import type { UserDetail } from "$lib/types/types";
	import { NotFoundError, UnauthorizedError } from "$lib/api/exception";

    // Reload when value is set to true
    reloadStore.subscribe((value) => {
        if (browser && value){
            clearTokens();
            clearUserDetailStore();
            reloadStore.set(false);
        }
    })

    // onMount(() => {
    //     getUserDetail();
    // });
</script>
  

<slot />