import { error } from '@sveltejs/kit'
import { homestayAPI, managerAPI, serviceAPI } from "$lib/api/api";
import type { LayoutServerLoad } from './$types';
import type { HomestayInfo, IService, ManagerInfo } from '$lib/types/types';

export const load = (async ({ params }) => {
    let homestayInfoRes: HomestayInfo
    let managerInfoRes: ManagerInfo
    let servicesRes: IService[]
    try {
        homestayInfoRes = await homestayAPI.getHomestayInfo(params.id);
        // console.log(homestayInfoRes);
        managerInfoRes = await managerAPI.getManagerInfo(homestayInfoRes.managerID);
        // console.log(managerInfoRes);
        servicesRes = await serviceAPI.getHomestayServices(homestayInfoRes.id);
        // console.log(servicesRes)
    } catch (err){
        throw error(404);
    }
    return {
        homestayInfo: homestayInfoRes,
        managerInfo: managerInfoRes,
        serviceInfo: servicesRes
    }
}) satisfies LayoutServerLoad;