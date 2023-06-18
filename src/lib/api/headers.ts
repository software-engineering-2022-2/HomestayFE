
import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { TokenPair } from "$lib/types/types";

export const tokens = writable({
    token: "",
    refreshToken: ""
} as TokenPair)

if (browser){
    tokens.set({
        token: localStorage.getItem('token') as string,
        refreshToken: localStorage.getItem('refreshToken') as string
    })
}

tokens.subscribe((value) => {
    if (browser){
        localStorage.setItem('token', value.token);
        localStorage.setItem('refreshToken', value.refreshToken);
    }
})

export const authHeader = derived(tokens, ($tokens) => {
    if (browser) {
      return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + $tokens.token
        }
      };
    }
    return {
        headers: {
            'Content-Type': 'application/json',
        }
    };
});

export const noAuthHeader = derived(tokens, () => {
    return {
        headers: {
            'Content-Type': 'application/json',
        }
    };
});