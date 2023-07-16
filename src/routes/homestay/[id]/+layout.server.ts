import { error } from '@sveltejs/kit'
import { bookingAPI, homestayAPI, managerAPI, serviceAPI } from "$lib/api/api";
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {

    async function findHomestayInfo(){
        const homestayInfoRes = await homestayAPI.getHomestayInfo(params.id);
        // console.log(homestayInfoRes);
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

    async function findHomestayBookedDates(){
        const bookedDatesRes = await bookingAPI.getHomestayBookedDates(homestayInfoRes.id);
        return bookedDatesRes
    }
    
    const [managerInfoRes, servicesRes, bookedDatesRes] = await Promise.all([
        findManagerInfo(),
        findHomestayServices(),
        findHomestayBookedDates()
      ]);

    return {
        homestayInfo: homestayInfoRes,
        managerInfo: managerInfoRes,
        serviceInfo: servicesRes,
        bookedDates: bookedDatesRes
    }
}) satisfies LayoutServerLoad;