import React from 'react';
import { PropTypes, number } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import { requestLogin, requestJwtLogin } from '../../actions/auth';

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 20),
    },
    typography: {
        flexGrow: 1,
        textAlign: 'center',
        color: 'red',
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText_userInfo: '',
            errorText_id: '学籍番号を入力してください',
            errorText_name: '名前を入力してください',
            errorText_password: 'パスワードを入力してください',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    async componentDidMount() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            this.props.dispatch(
                requestJwtLogin({
                    jwt: localStorage.getItem('jwt'),
                })
            );
        }
    }

    handleSubmit(e) {
        const target = e.target;
        e.preventDefault();
        const { errorText_id, errorText_name, errorText_password } = this.state;

        if (!errorText_id && !errorText_name && !errorText_password) {
            this.setState({
                errorText_userInfo: '',
            });
            this.props.dispatch(
                requestLogin({
                    studentId: target.studentId.value.trim(),
                    name: target.name.value.trim(),
                    password: target.password.value.trim(),
                })
            );
        } else {
            this.setState({
                errorText_userInfo: '全ての項目を埋めてください',
            });
        }
    }

    onChangeStudentId(e) {
        const studentId = e.target.value;
        if (studentId.length === 10) {
            this.setState({ errorText_id: '' });
        } else {
            this.setState({
                errorText_id: '学籍番号を入力してください',
            });
        }
    }

    onChangeName(e) {
        const name = e.target.value;
        if (name) {
            this.setState({ errorText_name: '' });
        } else {
            this.setState({
                errorText_name: '名前を入力してください',
            });
        }
    }

    onChangePassword(e) {
        const password = e.target.value;
        if (password.length >= 8) {
            this.setState({ errorText_password: '' });
        } else {
            this.setState({
                errorText_password: 'パスワードを入力してください',
            });
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={this.handleSubmit}
                    >
                        <TextField
                            error={!!this.state.errorText_id}
                            helperText={this.state.errorText_id}
                            onChange={this.onChangeStudentId}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="studentId"
                            label="Student ID"
                            name="studentId"
                            autoComplete="studentId"
                        />
                        <TextField
                            error={!!this.state.errorText_name}
                            helperText={this.state.errorText_name}
                            onChange={this.onChangeName}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="User Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            error={!!this.state.errorText_password}
                            helperText={this.state.errorText_password}
                            onChange={this.onChangePassword}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            LogIn
                        </Button>
                        <Typography
                            variant="caption"
                            display="block"
                            className={classes.typography}
                            gutterBottom
                        >
                            {/* {this.props.auth.error} */}
                            {this.state.errorText_userInfo}
                        </Typography>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </form>
                </div>
            </Container>
        );
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default compose(withStyles(useStyles), connect(mapStateToProps))(Login);
