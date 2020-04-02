import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class UserOnly extends React.Component {
    constructor(props) {
        super(props);
        console.log('ok');
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.guestWillTransfer(this.props, this.context.router);
    }

    componentDidUpdate(nextProps) {
        this.guestWillTransfer(nextProps, this.context.router);
    }

    guestWillTransfer(props, router) {
        console.log('ok');
        if (!props.auth.isLoggedIn) {
            router.replace('/login');
        }
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

UserOnly.propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

function mapStateToProps({ auth, router }) {
    return { auth, router };
}

export default connect(mapStateToProps)(UserOnly);
