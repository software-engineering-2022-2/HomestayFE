import { error } from '@sveltejs/kit'
import { homestayAPI, managerAPI } from "$lib/api/api";
import type { PageServerLoad } from './$types';
import type { HomestayInfo, ManagerInfo } from '$lib/types/types';

export const load = (async ({ params }) => {
    let homestayInfoRes: HomestayInfo
    let managerInfoRes: ManagerInfo
    try {
        homestayInfoRes = await homestayAPI.getHomestayInfo(params.id);
        // console.log(homestayInfoRes);
        managerInfoRes = await managerAPI.getManagerInfo(homestayInfoRes.managerID);
        // console.log(managerInfoRes);
    } catch (err){
        throw error(404);
    }
    return {
        homestayInfo: homestayInfoRes,
        managerInfo: managerInfoRes
    }
}) satisfies PageServerLoad;