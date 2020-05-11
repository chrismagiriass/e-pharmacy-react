import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CustomerForm from '../customers/CustomerForm';
import LoginForm from '../customers/LoginForm';

class MyModal extends Component {


    render() {
        let modalBody;
        if (this.props.register) {
            modalBody = <CustomerForm register={this.props.register} />
        } else {
            modalBody = <LoginForm></LoginForm>
        }
        return (
            <Modal show={this.props.showModal}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {modalBody}
                </Modal.Body>
            </Modal>
        );
    }
}

export default MyModal;