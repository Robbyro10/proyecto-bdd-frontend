export function validNocheSamba(startDate: string, endDate: string): boolean {
  // Convert the date strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Get the year and month of the start date
  const startYear = start.getFullYear();
  const startMonth = start.getMonth();

  // Get the year and month of the end date
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();

  // Check if the initial and final dates happened between October and March of the next year
  return (
    (startYear === endYear && startMonth >= 9 && endMonth <= 2) || // Same year
    (startYear < endYear && startMonth >= 9) ||                     // Start date is in the next year
    (startYear < endYear && endMonth <= 2)                          // End date is in the next year
  );
}