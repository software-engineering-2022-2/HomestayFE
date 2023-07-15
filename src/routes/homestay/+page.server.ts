import { error } from '@sveltejs/kit'
import { homestayAPI } from "$lib/api/api";
import type { HomestayInfo } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url }) => {
    let info: HomestayInfo[]
    if (url.searchParams.has('name') ||  url.searchParams.has('location')){
        try {
            info = await homestayAPI.getAllHomestayInfoByCondition(url.searchParams);
        } catch (err){
            throw error(404)
        }
    } else {
        try {
            info = await homestayAPI.getAllHomestayInfo();
        } catch (err){
            throw error(404)
        }
    }
    return {info};
}) satisfies PageServerLoad;