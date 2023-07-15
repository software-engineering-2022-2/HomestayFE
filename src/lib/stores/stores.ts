import { writable } from "svelte/store";
import { get } from 'svelte/store';

import type { HomestayInfo, ManagerInfo, UserDetail } from "$lib/types/types";

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
    managerID: "",
    description: "",
    stars: 0,
    numReviews: 0,
    address: "",
    price: 0,
    imageLink: ""
});

export const managerInfo = writable<ManagerInfo>({
    name: "",
    numHomestays: 0,
    avatarLink: ""
});