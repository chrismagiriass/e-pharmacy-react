import React, { Component } from "react";
import { Form, Col, InputGroup } from 'react-bootstrap';

class CustomerForm extends Component {



    render() {

        return (
            <div className="container">
                <Form noValidate validated={true} >
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                name="firstName"
                                required={true}
                                value={this.props.customer.firstName}
                                onChange={this.props.changeHandler}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                required={true}
                                name="lastName"
                                value={this.props.customer.lastName}
                                onChange={this.props.changeHandler}
                            />

                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationCustfomPassword">
                            <Form.Label>City</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    required={true}
                                    name="address.city"
                                    value={this.props.customer.address.city}
                                    onChange={this.props.changeHandler} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Region</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Region"
                                name="address.region"
                                required={true}
                                value={this.props.customer.address.region}
                                onChange={this.props.changeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                            <Form.Label>Street name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Street name"
                                name="address.streetName"
                                required={true}
                                value={this.props.customer.address.streetName}
                                onChange={this.props.changeHandler} />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Str. no </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Str. no"
                                name="address.streetNumber"
                                value={this.props.customer.address.streetNumber}
                                required={true}
                                onChange={this.props.changeHandler} />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Zip code</Form.Label>
                            <Form.Control
                                type="number"
                                min={"0"}
                                max={"123123"}
                                required={true}
                                placeholder="Zip code"
                                name="address.zipCode"
                                value={this.props.customer.address.zipCode}
                                onChange={this.props.changeHandler} />
                        </Form.Group>
                    </Form.Row>
                    <button type="submit" className="btn btn-submit" onClick={this.props.onSubmit}>Next</button>
                </Form>
            </div>
        );
    }

}

export default CustomerForm;