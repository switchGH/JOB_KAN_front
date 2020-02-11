import React from 'react';
import 'date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = React.useState(
        new Date('2020-01-18T21:11:54')
    );
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    return (
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker-inline"
            label="日付"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
    );
};

export default DatePicker;
