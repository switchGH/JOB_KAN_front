import React from 'react';
import 'date-fns';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margisnLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const TimePicker = props => {
    const classes = useStyles();
    return (
        <TextField
            id="time"
            label={props.value}
            type="time"
            margin="normal"
            defaultValue="07:30"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                step: 300, // 5 min
            }}
        />
    );
};

TimePicker.propTypes = {
    value: PropTypes.string.isRequired,
};

export default TimePicker;
