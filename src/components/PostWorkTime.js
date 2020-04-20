import React from 'react';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
} from '@material-ui/core';
import { post } from '../modules/httpRequest';

const useStyles = (theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    button: {
        fontWeight: 'bold',
        fontSize: '16px',
        width: '30%',
        height: 50,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '50%',
    },
    textField_content: {
        marginBottom: theme.spacing(3),
        width: '85%',
    },
    grid: {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    error: {
        paddingTop: theme.spacing(1),
        flexGrow: 1,
        textAlign: 'center',
        color: 'red',
    },
    typography: {
        paddingTop: theme.spacing(1),
        flexGrow: 1,
        fontWeight: 'bold',
    },
});

class PostWorkTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: '',
            errorText_date: '日付を入力してください',
            errorText_time: '時間を入力してください',
            errorText_content: '作業内容を入力してください',
        };
        this.changeDate = this.changeDate.bind(this);
        this.changeWorkTime = this.changeWorkTime.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // 認証
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
    }

    changeDate(e) {
        const date = e.target.value;
        if (date) {
            this.setState({ errorText_date: '' });
        } else {
            this.setState({ errorText_date: '日付を入力してください' });
        }
    }

    changeWorkTime(e) {
        const time = e.target.value;
        if (time) {
            this.setState({ errorText_time: '' });
        } else {
            this.setState({ errorText_time: '時間を入力してください' });
        }
    }

    changeContent(e) {
        const content = e.target.value;
        if (content) {
            this.setState({ errorText_content: '' });
        } else {
            this.setState({ errorText_content: '作業内容を入力してください' });
        }
    }

    // POST
    async handleSubmit(e) {
        e.preventDefault();
        const studentId = this.props.auth.user.studentId;
        const date = e.target.date.value;
        const time = e.target.time.value;
        const content = e.target.content.value;
        const jwt = this.props.auth.jwt;
        const url = 'http://localhost:3002/api/v1/work-time/';

        if (date && time && content && jwt) {
            this.setState({ errorText: '' });
            const year = parseInt(date.split('-')[0], 10).toString();
            const month = parseInt(date.split('-')[1], 10).toString();
            const day = parseInt(date.split('-')[2], 10).toString();

            // POSTデータ
            const body = {
                studentId: studentId,
                date: {
                    full_date: year + '/' + month + '/' + day,
                    year: year,
                    month: month,
                    day: day,
                },
                time: {
                    display: time,
                    convert_sec: this.calSecond(time),
                },
                content: content,
            };

            try {
                const res = await post({ body, url, jwt });
                this.setState({ errorText: res.message });
            } catch (e) {
                console.log(e);
            }
        } else {
            this.setState({ errorText: '入力できていない箇所があります' });
        }
    }

    calSecond(time) {
        const hour = parseInt(time.split(':')[0], 10) * 3600;
        const minutes = parseInt(time.split(':')[1], 10) * 60;
        return hour + minutes;
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <Typography
                            component="h6"
                            variant="h6"
                            color="primary"
                            className={classes.typography}
                            gutterBottom
                        >
                            作業登録
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <Grid
                                container
                                justify="flex-start"
                                spacing={3}
                                className={classes.grid}
                            >
                                <Grid item xs={4}>
                                    {/* <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            > */}
                                    <TextField
                                        error={!!this.state.errorText_date}
                                        helperText={this.state.errorText_date}
                                        onChange={this.changeDate}
                                        //id="date"
                                        name="date"
                                        label="作業日付"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    {/* </MuiPickersUtilsProvider> */}
                                </Grid>
                                <Grid item xs={4} className={classes.grid}>
                                    <TextField
                                        error={!!this.state.errorText_time}
                                        helperText={this.state.errorText_time}
                                        onChange={this.changeWorkTime}
                                        id="time"
                                        name="time"
                                        label="作業時間"
                                        type="time"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!!this.state.errorText_content}
                                        helperText={
                                            this.state.errorText_content
                                        }
                                        onChange={this.changeContent}
                                        className={classes.textField_content}
                                        id="outlined-full-width"
                                        name="content"
                                        label="作業内容"
                                        style={{ margin: 8 }}
                                        placeholder="作業内容...."
                                        //helperText="Full width!"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        className={classes.button}
                                    >
                                        Record
                                    </Button>
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        className={classes.error}
                                        gutterBottom
                                    >
                                        {this.state.errorText}
                                        {/* {this.props} */}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </React.Fragment>
                </Paper>
            </Container>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

PostWorkTime.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(PostWorkTime);
