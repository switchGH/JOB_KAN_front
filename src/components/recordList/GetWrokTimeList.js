import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Circular from '../loading/Circular';
import Button from '@material-ui/core/Button';

const useStyles = theme => ({
    tableWidth: {
        width: 700,
    },
});

class GetWorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workTimeList: [],
            laoding: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        return fetch('http://localhost:3002/api/v1/work-time/1610370216')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    workTimeList: responseJson,
                    laoding: true,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClick() {
        //POSTする
    }

    render() {
        const classes = this.props.classes;
        if (this.state.laoding) {
            return (
                <TableBody>
                    {this.state.workTimeList.map(work => (
                        <TableRow key={work.id}>
                            <TableCell align="left" width="200">
                                {work.year} / {work.month} / {work.day}
                            </TableCell>
                            <TableCell align="left">
                                {work.hour}時間 {work.minutes}分
                            </TableCell>
                            <TableCell align="center">{work.unit}</TableCell>
                            <TableCell
                                align="center"
                                className={classes.tableWidth}
                            >
                                {work.content}
                            </TableCell>
                            <TableCell align="right">
                                {work.flag ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        textColor="#ffffff"
                                        onClick={this.handleClick}
                                    >
                                        確認済
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.handleClick}
                                    >
                                        未確認
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            );
        } else {
            return (
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Circular />
                        </TableCell>
                        <TableCell>
                            <Circular />
                        </TableCell>
                        <TableCell>
                            <Circular />
                        </TableCell>
                        <TableCell>
                            <Circular />
                        </TableCell>
                        <TableCell>
                            <Circular />
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
        }
    }
}

GetWorkTimeList.propTypes = {
    recordList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.object.isRequired,
            date: PropTypes.string.isRequired,
            start_time: PropTypes.string.isRequired,
            end_time: PropTypes.string.isRequired,
            break_time: PropTypes.string.isRequired,
            work_time: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
};

export default withStyles(useStyles)(GetWorkTimeList);
