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

export { clamp, extractUrl };
