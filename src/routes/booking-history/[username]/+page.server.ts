import { bookingAPI } from "$lib/api/api";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    let bookingHist = await bookingAPI.getBookingHistory(params.username);
    if (!bookingHist) throw error(404);
    return {
        bookingHist
    };
}