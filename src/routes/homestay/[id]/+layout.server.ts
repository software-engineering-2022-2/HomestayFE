import { error } from '@sveltejs/kit'
import { homestayAPI, managerAPI, serviceAPI } from "$lib/api/api";
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {

    async function findHomestayInfo(){
        const homestayInfoRes = await homestayAPI.getHomestayInfo(params.id);
        return homestayInfoRes
    }

    const homestayInfoRes = await findHomestayInfo()
    async function findManagerInfo(){
        const managerInfoRes = await managerAPI.getManagerInfo(homestayInfoRes.managerID);
        return managerInfoRes
    }
    async function findHomestayServices(){
        const servicesRes = await serviceAPI.getHomestayServices(homestayInfoRes.id);
        return servicesRes
    }
    
    const [managerInfoRes, servicesRes] = await Promise.all([
        findManagerInfo(),
        findHomestayServices(),
      ]);

    return {
        homestayInfo: homestayInfoRes,
        managerInfo: managerInfoRes,
        serviceInfo: servicesRes
    }
}) satisfies LayoutServerLoad;