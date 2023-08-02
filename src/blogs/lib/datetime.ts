import { format } from 'date-fns';

/**
 * formatDate
 */

export function formatDate(date: any, pattern = 'PPP') {
  return format(new Date(date), pattern);
}

/**
 * sortObjectsByDate
 */

export function sortObjectsByDate(array: Array<any>, { key = 'date' } = {}): any {
  return array.sort((a, b) => {
      const newA: any = new Date(a[key]);
      const newB: any = new Date(b[key]);
      return newB - newA;
    });
}
