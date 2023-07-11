import { writable } from "svelte/store";
import type { UserDetail } from "$lib/types/types";

import { browser } from '$app/environment';

const userDetail: UserDetail = {
    username: "",
    firstName: "",
    lastName: ""
}

const userDetailStore = writable(userDetail);

if (browser){
    userDetailStore.set({
        username: localStorage.getItem('username') || "",
        firstName: "",
        lastName: ""
    })
}

userDetailStore.subscribe((value) => {
    if (browser){
        localStorage.setItem('username', value.username);
    }
})

export function clearUserDetailStore(){
    userDetailStore.set({
        username: "",
        firstName: "",
        lastName: ""
    })
}

export {userDetailStore};