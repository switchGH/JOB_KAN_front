import React from 'react';
import PropTypes from 'prop-types';
//import Record from '../Record';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    tableWidth: {
        width: 700,
    },
}));

const RecordList = ({ recordList }) => {
    const classes = useStyles();

    return (
        <TableBody>
        {recordList.map(record => (
            <TableRow key={record.id}>
                <TableCell align="left">{record.date}</TableCell>
                <TableCell align="left">{record.start_time}</TableCell>
                <TableCell align="left">{record.end_time}</TableCell>
                <TableCell align="left">{record.break_time}</TableCell>
                <TableCell align="left">{record.work_time}</TableCell>
                <TableCell align="center" className={classes.tableWidth}>{record.content}</TableCell>
            </TableRow>
        ))}
        </TableBody>
    )
}

RecordList.propTypes = {
    recordList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.object.isRequired,
            date: PropTypes.string.isRequired,
            start_time: PropTypes.string.isRequired,
            end_time: PropTypes.string.isRequired,
            break_time: PropTypes.string.isRequired,
            work_time: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}
export default RecordList