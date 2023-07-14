import { error } from '@sveltejs/kit'
import { homestayAPI } from "$lib/api/api";

export async function load() {
    let info = await homestayAPI.getAllHomestayInfo();
    if (!info) throw error(404);
    return {info};
}