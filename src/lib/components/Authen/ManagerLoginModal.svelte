<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { authAPI, userAPI } from '$lib/api/api';
    import { clearTokens, tokens } from '$lib/api/headers';
    import { userDetailStore } from '$lib/stores/stores';
    import { NotFoundError, UnauthorizedError } from '$lib/api/exception';
    import type { TokenPair, UserDetail } from '$lib/types/types';
	import { AxiosError } from 'axios';

    const dispatch = createEventDispatcher();

    let username = '';
    let password = '';
    let is_manager = 'false';

    async function handleSubmit() {
        // Do Login
        let tokenPair: TokenPair
        try {
            tokenPair = await authAPI.userLogin(username, password);
        } catch(error){
            if (error instanceof UnauthorizedError){
                alert(error.message);
            }
            return;
        }
        console.log(tokenPair);
        // Add tokens to store
        tokens.set(tokenPair);

        // Check if the account is manager
        let managerDetail: UserDetail
        try {
            managerDetail = await userAPI.getUserDetail(username);
        } catch (error) {
            if (error instanceof AxiosError) {
                clearTokens();
                alert(error.message);
            }  
            return;
        }
        if (managerDetail.is_manager == false) {
            clearTokens();
            alert("Account is not a manager");
            return;
        }

        localStorage.setItem('username', username);
        localStorage.setItem('id', managerDetail.id);
        if (managerDetail.is_manager == true) {
            is_manager = 'true';
        }
        localStorage.setItem('is_manager', is_manager);

        userDetailStore.update(value => {
            value.username = username;
            value.id = managerDetail.id;
            value.is_manager = managerDetail.is_manager;
            return value;
        })
        console.log($userDetailStore);

        // Dispatch the "close" event to close the modal
        dispatch('close');
    }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-homestay-bg bg-no-repeat bg-cover bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full md:w-2/3 lg:w-1/2">

        <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-700">Login in as Manager</h2>
        <button on:click={() => dispatch('close')}>
            <iconify-icon class="text-3xl text-[#41644A] hover:text-[#263A29]" icon='zondicons:close-solid'></iconify-icon>
        </button>
        </div>

        <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-6">
            <label class="block text-lg font-bold mb-2 text-gray-700" for="email-input">
            Username:
            </label>
            <input class="w-full text-lg py-2 px-3 rounded border border-gray-300 text-gray-700" 
            type="text" id="email-input" bind:value={username} required />
        </div>
        <div class="mb-6">
            <label class="block text-lg font-bold mb-2 text-gray-700" for="password-input">
            Password:
            </label>
            <input class="w-full text-lg py-2 px-3 rounded border border-gray-300 text-gray-700" 
            type="password" id="password-input" bind:value={password} required />
        </div>
        <div class="flex justify-center">
            <button class="bg-[#41644A] hover:bg-[#263A29] text-white font-bold text-lg py-2 px-12 rounded" type="submit">
            Log In
            </button>
        </div>
        </form>
        
    </div>
</div>