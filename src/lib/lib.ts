/**
 * Convert a date to a string in the form YYYY-MM-DD
 */
export function dateToString(date: Date): string {
    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
  
    return [
        date.getFullYear(),
        '-',
        mm.length===2 ? '' : '0',
        mm,
        '-',
        dd.length===2 ? '' : '0',
        dd
    ].join(''); // padding
}
