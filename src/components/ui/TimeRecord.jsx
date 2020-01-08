import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from './Title';
//import RecordList from '../recordList/RcordList';
import GetRecordList from '../../containers/GetRecordListContainer';

// Generate Order Data
// function createData(id, date, start_time, end_time, break_time, work_time, content) {
//     return { id, date, start_time, end_time, break_time, work_time, content };
// }

// const rows = [
//     createData(0, '8/27', '0830', '1300', '0030', '0400', '論文作成'),
// ];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    tableWidth: {
        width: 700,
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    cell: {
        fontWeight: 'bold',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const TimeRecord = ({ recordList }) => {
    const classes = useStyles();
    console.log('below is recordList');
    console.log(recordList);
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <React.Fragment>
                            <Title>2019/8</Title>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.cell}>
                                            日程
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            開始
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            終了
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            休憩時間
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            作業時間
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.cell}
                                        >
                                            内容
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <GetRecordList />
                            </Table>
                            <div className={classes.seeMore}>
                                <Link
                                    color="primary"
                                    href="#"
                                    onClick={preventDefault}
                                >
                                    See more orders
                                </Link>
                            </div>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TimeRecord;
