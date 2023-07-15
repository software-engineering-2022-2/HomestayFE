import { error } from '@sveltejs/kit'
import { homestayAPI } from "$lib/api/api";
import type { PageServerLoad } from './$types';
import type { HomestayInfo } from '$lib/types/types';

export const load = (async ({ params }) => {
    let info: HomestayInfo
    try {
        info = await homestayAPI.getHomestayInfo(params.id);
    } catch (err){
        throw error(404);
    }
    return {info};
}) satisfies PageServerLoad;