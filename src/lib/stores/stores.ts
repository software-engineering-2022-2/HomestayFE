import { writable } from "svelte/store";

import type {HomestayInfo, IPricingConfig, ManagerInfo, UserDetail, ReserveBookingInfo, BookingInfo } from "$lib/types/types";

import { browser } from '$app/environment';

const userDetail: UserDetail = {
    username: "",
    first_name: "",
    last_name: "",
    is_superuser: false,
    is_staff: false
}

const userDetailStore = writable(userDetail);

if (browser){
    userDetailStore.set({
        username: localStorage.getItem('username') || "",
        first_name: "",
        last_name: "",
        is_superuser: false,
        is_staff: false
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
        last_name: "",
        is_superuser: false,
        is_staff: false
    })
}

export {userDetailStore};

const pricingConfig: IPricingConfig = {
    id: 0,
    name: "",
    deposit_percentage: 0,
    cancellation_refund_percentage: 0,
    free_cancellation_days: 0,
    discount: 0
}

export const homestayInfo = writable<HomestayInfo>({
    id: "",
    name: "",
    managerID: "",
    description: "",
    numReviews: 0,
    address: "",
    price: 0,
    imageLink: "",
    max_num_adults: 0,
    max_num_children: 0,
    pricing_config: pricingConfig,
    avg_rating: 0,
    reviews: []
});

export const managerInfo = writable<ManagerInfo>({
    name: "",
    numHomestays: 0,
    avatarLink: ""
});

export const apiCalling = writable(false)

export const reserveBookingInfo = writable({
    checkin_date: "",
    checkout_date: "",
    num_adults: 0,
    num_children: 0
} as ReserveBookingInfo)

export const bookingHistStore = writable<BookingInfo[]>();