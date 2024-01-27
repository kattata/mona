import type { APIResponse } from '~/types/server';

export function isNullable(value: any) {
  if (typeof value === 'object') {
    let isNull = false;
    for (const key in value) {
      if (value[key] === '' || value[key] === null || value[key] === undefined) {
        isNull = true;
      }
    }

    return isNull ? null : value;
  }

  return value || null;
}

export function noData() {
  const res: APIResponse = {
    data: null,
    success: false
  };

  return res;
}
