<script lang="ts">
    import "../app.css";
    
    import 'iconify-icon'

    import { tokens } from '$lib/api/headers';
    import { get } from 'svelte/store';
    import { userApi } from '$lib/api/api';
    import { userDetailStore, clearUserDetailStore } from "$lib/store/store";
    import { clearTokens } from "$lib/api/headers";

    async function getUserDetail() {
        // Do token verification
        if (get(tokens).token !== ""){
            let userDetail = await userApi.getUserDetail(get(userDetailStore).username);
            if (userDetail !== null){
                userDetailStore.set(userDetail);
            } else {
                clearTokens();
                clearUserDetailStore();
            }
        }
    }

    getUserDetail();
</script>
  

<slot />