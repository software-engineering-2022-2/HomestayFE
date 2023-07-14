<script lang="ts">
    import "../app.css";
    
    import 'iconify-icon'

    import { tokens } from '$lib/api/headers';
    import { get } from 'svelte/store';
    import { userApi } from '$lib/api/api';
    import { userDetailStore, clearUserDetailStore } from "$lib/store/store";
    import { clearTokens } from "$lib/api/headers";
	import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { reloadStore } from "$lib/store/reload";

    async function getUserDetail() {
        // Do token verification
        if (get(tokens).token !== ""){
            let userDetail = await userApi.getUserDetail(get(userDetailStore).username);
            if (userDetail !== null){
                userDetailStore.set(userDetail);
            } else {
                reloadStore.set(true); 
            }
        }
    }


    // Reload when value is set to true
    reloadStore.subscribe((value) => {
        if (browser && value){
            clearTokens();
            clearUserDetailStore();
            reloadStore.set(false);
        }
    })

    onMount(() => {
        getUserDetail();
    });
</script>
  

<slot />