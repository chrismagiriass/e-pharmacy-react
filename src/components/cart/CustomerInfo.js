import React, { Component } from "react";
import { Form, Col, InputGroup } from 'react-bootstrap';
import CardForm from '../payment/CardForm';

class CustomerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentMethods: ['Credit or Debit card', 'Pay on delivery', 'Bank deposit']
        }
    }


    render() {

        let paymentForm = '';
        if (this.props.payment === 'Credit or Debit card') {

            paymentForm = <Form.Row className={this.props.payment === 'Credit or Debit card' ? '' : 'hidden-row'}>
                <Form.Group as={Col} md="10" controlId="validationCustfomPassword">
                    <CardForm handleCreditCardChange={this.props.handleCreditCardChange} errorMessage={this.props.errorMessage}/>
                </Form.Group>
            </Form.Row>

        }

        return (
            <div className="container cart-container card-container" >

                <Form noValidate validated={this.props.validated} onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Personal Info</h3>

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

                        </div>
                        <div className="col-md-5 offset-md-1">
                            <h3 className="payment-header">Payment Method</h3>
                            <fieldset>
                                <Form.Group >
                                    {this.state.paymentMethods.map((method) => {
                                        let checked = false;
                                        if (method === this.props.payment) {
                                            checked = true;
                                        }
                                        return <div key={`default-${method}`} className="mb-3">
                                            <Form.Check
                                                checked={checked}
                                                type={'radio'}
                                                label={method}
                                                name="payment"
                                                id={`disabled-default-${method}`}
                                                value={method}
                                                onChange={this.props.onPaymentChange}
                                            />
                                            {method === 'Credit or Debit card' ? paymentForm : ''}
                                        </div>
                                    })}
                                </Form.Group>
                            </fieldset>


                        </div>
                   
                            <div className="col-md-4 offset-md-8" style={{ "margin-top": "60px" }}>
                                <button type="button" class="btn btn-outline-secondary btn-previous" onClick={this.props.previous}> Previous  </button>
                                <button type="submit" className="btn btn-submit" >Next</button>
                            </div>
                        
                    </div>
                </Form>


            </div>
        );
    }

}

export default CustomerForm;