export function formatDate(date: Date | null | undefined): string {
    if (!date || isNaN(date.getTime())) {
        return ''; // Return an empty string for null values
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get month index from 1 to 12
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}