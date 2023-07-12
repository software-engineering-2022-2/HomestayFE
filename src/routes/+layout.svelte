<script lang="ts">
    import "../app.css";
    
    import 'iconify-icon'

    import { tokens } from '$lib/api/headers';
    import { get } from 'svelte/store';
    import { userAPI } from '$lib/api/api';
    import { userDetailStore, clearUserDetailStore } from "$lib/stores/stores";
    import { clearTokens } from "$lib/api/headers";
	import { onMount } from "svelte";

    async function getUserDetail() {
        // Do token verification
        if (get(tokens).token !== ""){
            let userDetail = await userAPI.getUserDetail(get(userDetailStore).username);
            if (userDetail !== null){
                userDetailStore.set(userDetail);
            } else {
                clearTokens();
                clearUserDetailStore();
            }
        }
    }
    onMount(() => {
        getUserDetail();
    });
</script>
  

<slot />