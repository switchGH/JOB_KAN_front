import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from './Title';
import GetWorkTimeList from './recordList/GetWrokTimeList';

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

const useStyles = theme => ({
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
});

class WorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <React.Fragment>
                                <Title>一覧</Title>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.cell}>
                                                日程
                                            </TableCell>
                                            <TableCell className={classes.cell}>
                                                作業時間
                                            </TableCell>
                                            <TableCell className={classes.cell}>
                                                コマ数
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className={classes.cell}
                                            >
                                                内容
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={classes.cell}
                                            >
                                                確認ボタン
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <GetWorkTimeList></GetWorkTimeList>
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
    }
}

export default withStyles(useStyles)(WorkTimeList);
