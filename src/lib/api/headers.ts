
import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { TokenPair } from "$lib/types/types";

export const tokens = writable({
    token: "",
    refreshToken: ""
} as TokenPair)

if (browser){
    tokens.set({
        token: localStorage.getItem('token') || "",
        refreshToken: localStorage.getItem('refreshToken') || "",
    })
}

tokens.subscribe((value) => {
    if (browser){
        localStorage.setItem('token', value.token);
        localStorage.setItem('refreshToken', value.refreshToken);
    }
})

export function clearTokens(){
    if(browser){
        tokens.set({
            token: "",
            refreshToken: ""
        })
    }
}

export const uploadAvatarHeader = derived(tokens, ($tokens) => {
    if (browser) {
      return {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + $tokens.token
        }
      };
    }
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    };
});

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