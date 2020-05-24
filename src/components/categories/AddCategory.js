import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CategoryService from '../../services/categoryService';
import { withRouter } from "react-router-dom";
import { Form, Col, InputGroup } from 'react-bootstrap';


class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            category: {
                nameCategory: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

    }
    changeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            category: {
                ...this.state.category,
                [name]: value,
            }
        })

    }

    handleSubmit(event) {
        const form = event.currentTarget;
        console.log(this.state.category);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            CategoryService.post(this.state.category);
            this.props.onHide();
        }
    }


    render() {

        return (
            <Modal show={this.props.showModal}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="nameCategory"
                                        value={this.state.category.nameCategory}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <button type="submit" className="btn btn-submit float-right">Save</button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default withRouter(AddCategory);