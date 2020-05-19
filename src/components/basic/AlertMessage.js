
import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';


class AlertMessage extends Component {

    constructor(props) {
        super(props);
        this.state = { show: true };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: false });
        }, 5000);
    }

    render() {
        return (
            <Alert key={this.props.key} variant={this.props.variant} show={this.state.show}>
                {this.props.message}
            </Alert>
        );
    }
}

export default AlertMessage;

