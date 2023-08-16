import type { BookingPeriod, IBookingService, IPricingConfig } from './types';
import { goto } from '$app/navigation';

const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

function extractUrl(inputString: string | null) {
	if (!inputString) return ''
	const regex = /(https?:\/\/[^\s]+)/g;
	const matches = inputString.match(regex);
	if (matches && matches.length > 0) {
		return matches[0];
	} else {
		return '';
	}
}

function extractDate(dateString: string) {
	try {
		if (dateString === '') return `None`;
		const date = new Date(dateString);
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${month} ${day} ${year}`;
	} catch (err){
		return `None`
	}
}

export function formatPrice(price: number): string {
	return price.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' VND';
}

function formatDateForBooking(dateStr: string) {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

function getTomomorowOfDate(date: Date) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 1);
	return newDate;
}

function findFarthestPossibleDate(checkin_date: string, bookingPeriods: BookingPeriod[]): string {
	const specifiedDate = new Date(checkin_date);
	const dates = bookingPeriods
		.map((obj) => new Date(obj.from))
		.filter((date) => date > specifiedDate)
		.sort((a: Date, b: Date) => a.getTime() - b.getTime()); // Filter out dates smaller than the specified date
	if (dates.length == 0) return '';
	else {
		const date = dates[0];
		date.setDate(date.getDate() - 1);
		return formatDate(dates[0]);
	}
}

function getDaysDiff(checkinTime: string, checkoutTime: string) {
	try {
		if (checkinTime == '' || checkoutTime == '') return 0;
		const startDate = new Date(checkinTime);
		const endDate = new Date(checkoutTime);
		const timeDiff = endDate.getTime() - startDate.getTime();
		// Convert milliseconds to days
		const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));
		return clamp(daysDiff, 0, 999);
	} catch (err) {
		return 0;
	}
}
function getSericesPrice(bookingServices: IBookingService[]) {
	let totalServicePrice = 0;
	for (const bookingService of bookingServices) {
		if (bookingService.checked) {
			totalServicePrice += bookingService.price;
		}
	}
	return totalServicePrice;
}

function getPriceConfigTooltip(pricingConfig: IPricingConfig){
	return `Free Cancellation Days: ${pricingConfig.free_cancellation_days} days \nDiscount: ${pricingConfig.discount} \nDeposit Percentage: ${pricingConfig.deposit_percentage} \nCancellation Refund Percentage: ${pricingConfig.cancellation_refund_percentage} \n`
}

export function goToManagerBookingRequests(username: string) {
	if (username == '') {
		alert("Logged-in duration has expired. Please log in again");
		goto("/manager");
	} else {
		goto(`/manager/${username}/booking-requests`)
	}
}

export function goToManagerHomestaysDetails(username: string) {
	if (username == '') {
		alert("Logged-in duration has expired. Please log in again");
		goto("/manager");
	} else {
		goto(`/manager/${username}/homestays-details`)
	}
}

export function goToManagerAnalytics(username: string) {
	if (username == '') {
		alert("Logged-in duration has expired. Please log in again");
		goto("/manager");
	} else {
		goto(`/manager/${username}/analytics`)
	}
}

export {
	clamp,
	extractUrl,
	formatDateForBooking,
	formatDate,
	getTomomorowOfDate,
	findFarthestPossibleDate,
	getSericesPrice,
	getDaysDiff,
	extractDate,
	getPriceConfigTooltip
};
