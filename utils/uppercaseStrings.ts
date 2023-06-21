export function uppercaseStrings(obj: any) {
    const result = {} as any;
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = value.toUpperCase() as any;
      } else {
        result[key] = value;
      }
    }
    return result;
  }