import { writable } from "svelte/store";
import { get } from 'svelte/store';

import type { HomestayInfo, HostInfo, UserDetail } from "$lib/types/types";

import { browser } from '$app/environment';

const userDetail: UserDetail = {
    username: "",
    first_name: "",
    last_name: ""
}

const userDetailStore = writable(userDetail);

if (browser){
    userDetailStore.set({
        username: localStorage.getItem('username') || "",
        first_name: "",
        last_name: ""
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
        first_name: "",
        last_name: ""
    })
}

export {userDetailStore};

export const homestayInfo = writable<HomestayInfo>({
    name: "",
    description: "",
    stars: 0,
    numReviews: 0,
    address: "",
    price: 0
});

export const hostInfo = writable<HostInfo>({
    hostID: "",
    name: "",
    numGuests: 0,
    numRooms: 0
});