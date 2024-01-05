export function toDatePickerFormat(inputDate) {
    // Check if the date is already in the YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
        return inputDate; // Already in the correct format
    }

    const [day, month, year] = inputDate.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return formattedDate;
}

//Convert to date picker format
export function toRegularDateFormat(inputDate){
    const [year, month, day] = inputDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

