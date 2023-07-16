const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

function extractUrl(inputString: string) {
	const regex = /(https?:\/\/[^\s]+)/g;
	const matches = inputString.match(regex);
	if (matches && matches.length > 0) {
	  return matches[0];
	} else {
	  return '';
	}
}

function formatDateForBooking(dateStr: string){
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate
}

export { clamp, extractUrl, formatDateForBooking };
