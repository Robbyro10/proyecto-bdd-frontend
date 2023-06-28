export function isDateBetween(start: string, end: string, date: string) {
    // Convert the date strings to Date objects
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateToCheck = new Date(date);
  
    // Check if the date to check is between the start and end dates
    return dateToCheck >= startDate && dateToCheck <= endDate;
  }