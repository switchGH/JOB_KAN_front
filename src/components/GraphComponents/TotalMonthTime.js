import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';

const columns = [
    { id: 'date', label: '日付', minWidth: 170 },
    { id: 'time', label: '作業時間', minWidth: 100 },
];

function createWorkTime(data) {
    let { date, worktime } = data;
    let hour = 0;
    while (3600 <= worktime) {
        worktime -= 3600;
        hour++;
    }
    // const hour = worktime < 3600 ? 0 : worktime / 3600;
    const minutes = worktime / 60;
    const time = hour.toString() + '時間' + minutes.toString() + '分';
    return { date, time };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    title: {
        align: 'center',
        fontWeight: 'bold',
        padding: theme.spacing(1),
        color: 'lightseagreen',
    },
    container: {
        maxHeight: '500px',
    },
}));

export function TotalMonthTime(props) {
    console.log(props);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const rows = [];
    for (let i in props.data) {
        rows.push(createWorkTime(props.data[i]));
    }

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Typography
                    variant="h6"
                    component="h6"
                    className={classes.title}
                >
                    月別作業時間
                </Typography>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.format &&
                                                        typeof value ===
                                                            'number'
                                                            ? column.format(
                                                                  value
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </React.Fragment>
    );
}

TotalMonthTime.propTypes = {
    data: PropTypes.array.isRequired,
};
