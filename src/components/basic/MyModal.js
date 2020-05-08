import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CustomerForm from '../customers/CustomerForm';

class MyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            register: this.props.register     
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        console.log("hello")
        console.log(this.props.Title)
    }

    render() {

        return (
            <Modal show={this.props.showModal}
            onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.Title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CustomerForm register={true} />
                </Modal.Body>
            </Modal>
        );
    }
}

export default MyModal;