export function formatDate(date: Date | string | null | undefined): string {
    // Check if the date is null or undefined, and return an empty string if so
    if (!date) {
        return '';
    }

    // If the date is a string, convert it to a Date object
    if (typeof date === 'string') {
        date = new Date(date);
    }

    // Check if the date is a valid Date object
    if (isNaN(date.getTime())) {
        return '';
    }

    // Format the date as DD-MM-YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
