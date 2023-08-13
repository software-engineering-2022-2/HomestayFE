import { error } from '@sveltejs/kit'
import { homestayAPI } from "$lib/api/api";
import type { IHomestayPage } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url }) => {
    let info: IHomestayPage
    if (url.searchParams.has('name') ||  url.searchParams.has('city')){
        try {
            url.searchParams.set('page', '0')
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