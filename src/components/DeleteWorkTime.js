import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import {
    Paper,
    Grid,
    Container,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';
import { request } from '../modules/httpRequest';

const useStyles = (theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        //textAlign: 'center',
        flexDirection: 'column',
    },
    grid: {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '60%',
    },
    button: {
        fontWeight: 'bold',
        fontSize: '16px',
        width: '30%',
        height: 50,
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

class DeleteWorkTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: '',
            errorText_id: 'IDを入力してください',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeID = this.changeID.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
    }

    changeID(e) {
        const id = e.target.value;
        if (24 === id.length) {
            this.setState({ errorText_id: '' });
        } else {
            this.setState({ errorText_id: 'IDを入力してください' });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const studentId = this.props.auth.user.studentId;
        const objectId = e.target.objectId.value;
        const url = `http://localhost:3002/api/v1/work-time/${studentId}/${objectId}`;
        const jwt = this.props.auth.jwt;

        if (studentId && objectId) {
            this.setState({ errorText: '' });
            try {
                const res = await request({ url, type: 'DELETE', jwt });
                console.log(res);
                this.setState({ errorText: res.message });
            } catch (e) {
                console.log(e);
                this.setState({ errorText: e });
            }
        } else {
            this.setState({ errorText: '入力できていない箇所があります' });
        }
    }

    render() {
        const { classes } = this.props;
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
                            作業削除
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <Grid container justify="flex-start" spacing={2}>
                                <Grid item xs={12} className={classes.grid}>
                                    <TextField
                                        error={!!this.state.errorText_id}
                                        helperText={this.state.errorText_id}
                                        onChange={this.changeID}
                                        name="objectId"
                                        label="作業ID"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.grid}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        className={classes.button}
                                    >
                                        Delete
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

DeleteWorkTime.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(DeleteWorkTime);
