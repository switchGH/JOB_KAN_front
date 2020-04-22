// 年月の重複を検知
export function isArrayExists(array, year, month) {
    for (let i = 0; i < array.length; i++) {
        if (year === array[i].year && month === array[i].month) {
            return { judge: 'Exit', index: i };
        }
    }
    return { judge: 'NoExit', index: 0 };
}
