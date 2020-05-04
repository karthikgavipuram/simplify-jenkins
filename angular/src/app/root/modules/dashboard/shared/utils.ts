export class Util {
    public static sortJsonArray(array: any[], key: string, asc: boolean) {
        array.sort((a, b) => {
            let val1 = a[key]; let val2 = b[key];
            if (typeof val1 === 'string') {
                val1 = val1.toLowerCase();
            }
            if (typeof val2 === 'string') {
                val2 = val2.toLowerCase();
            }
            if (val1 === val2) return 0;
            if (asc) {
                return val1 > val2 ? 1 : -1;
            } else {
                return val1 > val2 ? -1 : 1;
            }
        });
        return array;
    }
    public static clone(val: any) {
        return JSON.parse(JSON.stringify(val));
      }
}