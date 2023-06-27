export function checkDates(initialDateStr: string, finalDateStr: string) {

  // Convert input strings to Date objects
  const initialDate = new Date(initialDateStr);
  const finalDate = finalDateStr ? new Date(finalDateStr) : null;

  // Check that initialDate is a valid date
  if (isNaN(initialDate.getTime())) {
    return false;
  }

  // Check that finalDate is a valid date and does not exceed the year 2023
  if (finalDate && (isNaN(finalDate.getTime()) || finalDate.getFullYear() > 2023)) {
    return false;
  }

  // Check that the initial date is before or equal to the final date, if both dates are provided
  if (finalDate && initialDate.getTime() > finalDate.getTime()) {
    return false;
  }

  // All checks passed, return true
  return true;
}