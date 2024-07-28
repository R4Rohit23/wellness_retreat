export const formatDate = (dateString: Date) => {
	const date = new Date(dateString);
	const options = { day: "numeric", month: "long", year: "numeric" };
	return date.toLocaleDateString("en-GB", options as any);
};

export function epochToDate(epoch: number) {
	// Create a new Date object, multiplying by 1000 to convert seconds to milliseconds
	const date = new Date(epoch * 1000);

	return formatDate(date);
}
