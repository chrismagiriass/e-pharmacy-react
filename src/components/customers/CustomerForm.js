import React, { Component } from "react";
import "./customerForm.css";
import { Form, Col, InputGroup } from 'react-bootstrap';
import CustomerService from "../../services/customerService";
import { withRouter } from "react-router-dom";

class CustomerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            register: this.props.register,
            hiddenCheckBox: this.props.register,
            validated: false,
            customer: this.props.customer|| {
                firstName: '',
                role: 'CUSTOMER',
                lastName: '',
                password: '',
                email: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.showExtraFields = this.showExtraFields.bind(this);

    }
    changeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (name.indexOf('address.') >= 0) {
            this.setState({
                customer: {
                    address: {
                        ...this.state.customer.address,
                        [name.split(".")[1]]: value
                    }
                }
            })
        } else {
            this.setState({
                customer: {
                    ...this.state.customer,
                    [name]: value,
                }
            })
        }

    }

    handleSubmit(event) {
        const form = event.currentTarget;
        console.log(this.state.customer);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            CustomerService.post(this.state.customer);
            this.props.history.push("/customers");

        }
    }

    showExtraFields() {

        this.setState({ register: !this.state.register });
        if (this.state.register) {
            this.setState({
                customer:{
                    ...this.state.customer,
                    address: {
                        city: '',
                        streetName: '',
                        streetNumber: '',
                        region: '',
                        zipCode: ''
                    }
                }
            })

        }
    }

    render() {
        let addressFields = '';
        if (!this.state.register) {

            addressFields = <Form.Row className={this.state.register ? 'hidden-row' : ''}>
                <Form.Group as={Col} md="6" controlId="validationCustfomPassword">
                    <Form.Label>City</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="address.city"
                            value={this.state.customer.address.city}
                            onChange={this.changeHandler} />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Region</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Region"
                        name="address.region"
                        value={this.state.customer.address.region}
                        onChange={this.changeHandler} />
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label>Street name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Street name"
                        name="address.streetName"
                        value={this.state.customer.address.streetName}
                        onChange={this.changeHandler} />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Str. no </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Str. no"
                        name="address.streetNumber"
                        value={this.state.customer.address.streetNumber}
                        onChange={this.changeHandler} />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Zip code</Form.Label>
                    <Form.Control
                        type="number"
                        min={"0"}
                        max={"123123"}

                        placeholder="Zip code"
                        name="address.zipCode"
                        value={this.state.customer.address.zipCode}
                        onChange={this.changeHandler} />
                </Form.Group>
            </Form.Row>

        }
        return (
            <div className="container">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                name="firstName"
                                value={this.state.customer.firstName}
                                onChange={this.changeHandler}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                name="lastName"
                                value={this.state.customer.lastName}
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
                                    value={this.state.customer.email}
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
                                    value={this.state.customer.password}
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
                                    value={this.state.customer.password}
                                    onChange={this.changeHandler}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password is required.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    {addressFields}
                    <Form.Group>
                        <Form.Check className={this.state.hiddenCheckBox ? '' : 'hidden-row'}
                            label="Fill in address info."
                            onChange={this.showExtraFields}
                        />
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                        />
                    </Form.Group>
                    <button type="submit" className="btn btn-submit float-right">{this.state.register ? 'Register' : 'Update'}</button>
                </Form>
            </div>
        );
    }

}

export default withRouter(CustomerForm);