import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

const columns = [
    { id: 'date', label: '日程', minWidth: 30, align: 'center' },
    { id: 'worktime', label: '作業時間', minWidth: 50, align: 'center' },
    { id: 'unit', label: 'コマ数', minWidth: 10, align: 'center' },
    { id: 'content', label: '内容', minWidth: 700, align: 'center' },
    { id: 'verifield', label: '確認ボタン', minWidth: 40, align: 'center' },
];

class WorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workTimeList: [],
            loading: false,
            page: 0,
            rowsPerPage: 10,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount() {
        return fetch('http://localhost:3002/api/v1/work-time/1610370216')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    workTimeList: responseJson,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChangePage(e, newPage) {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage(e) {
        this.setState({ rowsPerPage: +e.target.value });
        this.setState({ page: 0 });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <React.Fragment>
                        <Table stickyHeader arial-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(columns => (
                                        <TableCell
                                            key={columns.id}
                                            align={columns.align}
                                            style={{
                                                minWidth: columns.minWidth,
                                            }}
                                        >
                                            {columns.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.workTimeList
                                    .slice(
                                        this.state.page * this.state.rowsPerPage,
                                        this.state.page * this.state.rowsPerPage +
                                            this.state.rowsPerPage
                                    )
                                    .map(work => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tableIndex={-1}
                                                key={work.date}
                                            >
                                                {columns.map(column => {
                                                    let value = work[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </React.Fragment>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 30, 50]}
                    component="div"
                    count={this.state.workTimeList.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

export default withStyles(useStyles)(WorkTimeList);
