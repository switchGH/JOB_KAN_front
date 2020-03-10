import { Decimal } from 'decimal.js';
import { MonthSelection } from '@material-ui/pickers/views/Month/MonthView';

// 年月の重複を検知
export function isArrayExists(array, year, month) {
    for (let i = 0; i < array.length; i++) {
        if (year == array[i].year && month == array[i].month) {
            return { judge: 'Exit', index: i };
        }
    }
    return { judge: 'NoExit', index: 0 };
}

// 作業時間のパース
export function convertTime(time) {
    const data = time.split(':');
    const hour = parseInt(data[0]);
    let minutes = new Decimal(data[1]);
    minutes = minutes.dividedBy(60).toFixed(2);
    return new Decimal(hour).plus(minutes).toNumber();
}

// 月 昇順ソート

// 日 ソート
export function createMonthlyList(getJsonData, param) {
    let list = [];
    getJsonData.map(data => {
        if (data.month == param) {
            list.push(data);
        }
    });

    list.sort((a, b) => {
        let left = Number(a.date.split('/')[1]);
        let right = Number(b.date.split('/')[1]);
        if (left > right) {
            return 1;
        } else {
            return -1;
        }
    });
    return list;
}
