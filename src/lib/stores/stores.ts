import { writable } from "svelte/store";

import type { HomestayInfo, IPricingConfig, ManagerInfo, UserDetail, ReserveBookingInfo } from "$lib/types/types";

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
    stars: 0,
    numReviews: 0,
    address: "",
    price: 0,
    imageLink: "",
    max_num_adults: 0,
    max_num_children: 0,
    pricing_config: pricingConfig
});

export const managerInfo = writable<ManagerInfo>({
    name: "",
    numHomestays: 0,
    avatarLink: ""
});

// interface IBookingPeriod {
//     checkinTime: Date,
//     checkoutTime: Date
// }

export const bookingPeriod = writable({
    checkin_date: "",
    checkout_date: ""
} as ReserveBookingInfo)