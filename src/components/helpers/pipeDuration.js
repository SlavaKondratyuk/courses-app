export default function MinutesToHours(minutes) {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
}
