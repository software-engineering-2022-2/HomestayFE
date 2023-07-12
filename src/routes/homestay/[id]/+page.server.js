import { error } from '@sveltejs/kit'
import { homestayAPI } from "$lib/api/api";

export async function load({ params }) {
    let info = await homestayAPI.getHomestayInfo(params.id);
    if (!info) throw error(404);
    return {info};
}