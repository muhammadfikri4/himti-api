export const FormatIDTime = (date: Date, type: 'date' | 'string' = 'string') => {
    const dates = new Date(date);
    // const format = dates.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    // return format
    const timezoneOffset = 7 * 60; // 7 hours converted to minutes
    const localDate = new Date(dates.getTime() + timezoneOffset * 60 * 1000);

    if(type) {
        // Convert to ISO string without affecting the timezone
        const isoString = localDate.toISOString()
        return isoString
    }

    return localDate
}