import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Circular from '../loading/Circular';

const useStyles = theme => ({
    tableWidth: {
        width: 700,
    },
});

class GetWorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            recordList: [],
            laoding: false,
        };
    }

    async componentDidMount() {
        return fetch('http://localhost:3003/sample?id=1')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    userInfo: responseJson[0],
                    recordList: responseJson[0].record,
                    laoding: true,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const classes = this.props.classes;
        if (this.state.laoding) {
            return (
                <TableBody>
                    {this.state.recordList.map(record => (
                        <TableRow key={record.id}>
                            <TableCell align="left" width="200">
                                {record.year} / {record.date}
                            </TableCell>
                            <TableCell align="left">
                                {record.work_time}
                            </TableCell>
                            <TableCell align="left">{record.unit}</TableCell>
                            <TableCell
                                align="center"
                                className={classes.tableWidth}
                            >
                                {record.content}
                            </TableCell>
                            <TableCell align="right">
                                {record.verified}
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
