import { Temporal } from 'temporal-polyfill';

/**
 * Formats a date string in ISO 8601 format to "YYYY/MM/DD" format.
 * @param isoDate - a date string in ISO 8601 format (e.g., "2026-07-25T12:00:00Z")
 * @returns formatted date string in the format of "YYYY/MM/DD"
 */
export function formatDate(isoDate: string) {
	const date = Temporal.Instant.from(isoDate).toZonedDateTimeISO('Asia/Tokyo').toPlainDate();
	const formattedDate = `${date.year}/${date.month}/${date.day}`;

	return formattedDate;
}
