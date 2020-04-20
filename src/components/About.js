import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Paper,
    Grid,
    Container,
    Typography,
} from '@material-ui/core';
import { AboutSite, UseSite, ContactUs } from './AboutComponents';
import 'react-calendar/dist/Calendar.css';

const useStyles = (theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        //textAlign: 'center',
        flexDirection: 'column',
    },
    title: {
        fontWeight: 'bold',
        padding: theme.spacing(1),
        //color: 'lightseagreen',
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appbar: {
        backgroundColor: 'black',
    },
    tab: {
        fontWeight: 'bold',
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, newValue) {
        this.setState({ value: newValue });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <AppBar
                                position="static"
                                className={classes.appbar}
                            >
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    aria-label="simple tabs example"
                                >
                                    <Tab
                                        label="このサイトについて"
                                        className={classes.tab}
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label="JOB KANの使い方"
                                        className={classes.tab}
                                        {...a11yProps(1)}
                                    />
                                    <Tab
                                        label="お問い合わせ"
                                        className={classes.tab}
                                        {...a11yProps(2)}
                                    />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.value} index={0}>
                                <AboutSite />
                            </TabPanel>
                            <TabPanel value={this.state.value} index={1}>
                                <UseSite />
                            </TabPanel>
                            <TabPanel value={this.state.value} index={2}>
                                <ContactUs />
                            </TabPanel>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

About.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(withStyles(useStyles), connect(mapStateToProps))(About);
