import { error } from '@sveltejs/kit'
import { homestayAPI } from "$lib/api/api";
import type { HomestayInfo } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    let info: HomestayInfo[]
    try {
        info = await homestayAPI.getAllHomestayInfo();
    } catch (err){
        throw error(404)
    }
    return {info};
}) satisfies PageServerLoad;