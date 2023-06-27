export function deleteFalsyAttributes(obj: any) {
    for (const key in obj) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
  }