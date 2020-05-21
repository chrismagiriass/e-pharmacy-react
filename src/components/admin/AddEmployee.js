import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import EmployeeService from "../../services/employeeService";
import { withRouter } from "react-router-dom";
import { Form, Col, InputGroup } from 'react-bootstrap';

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: true,
            employee: this.props.employee || {
                firstName: '',
                role: 'EMPLOYEE',
                lastName: '',
                password: '',
                email: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

    }
    changeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            employee: {
                ...this.state.employee,
                [name]: value,
            }
        })

    }

    handleSubmit(event) {
        const form = event.currentTarget;
        console.log(this.state.employee);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            EmployeeService.post(this.state.employee);
            this.props.history.push("/employees");

        }
    }

    render() {

        return (
            <Modal show={this.props.showModal}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First name"
                                        name="firstName"
                                        value={this.state.employee.firstName}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last name"
                                        name="lastName"
                                        value={this.state.employee.lastName}
                                        onChange={this.changeHandler}
                                    />

                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                                    <Form.Label>E-mail</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="Email"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="email"
                                            value={this.state.employee.email}
                                            onChange={this.changeHandler}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            E-mail is required.
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustomPassword">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            value={this.state.employee.password}
                                            onChange={this.changeHandler}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password is required.
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustomPassword">
                                    <Form.Label>Verify Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            value={this.state.employee.password}
                                            onChange={this.changeHandler}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password is required.
                                </Form.Control.Feedback>
                                    </InputGroup>
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

export default withRouter(AddEmployee);