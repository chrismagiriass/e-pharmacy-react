import React, { Component } from 'react';
import {
    CardElement,
    injectStripe,
    StripeProvider,
    Elements,
} from 'react-stripe-elements';

class _CardForm extends Component {
    

 

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken().then(this.props.handleResult);
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    render() {
        return (
            <div className="card-container">
                <p style={{
                    float: 'left',
                    margin: '12px'
                }}> Card details</p>

                <label className="col-md-12">
                    <CardElement
                        onChange={this.props.handleCreditCardChange}
                    />
                </label>
                <div className="alert-danger" role="alert">
                    {this.props.errorMessage}
                </div>
            </div>

        );
    }
}

const CardForm = injectStripe(_CardForm);

export default class CardDemo extends Component {
    render() {
        return (
            <StripeProvider apiKey="pk_RXwtgk4Z5VR82S94vtwmam6P8qMXQ">
                <Elements>
                    <CardForm handleResult={this.props.handleResult} handleCreditCardChange={this.props.handleCreditCardChange} errorMessage={this.props.errorMessage}/>
                </Elements>
            </StripeProvider>
        );
    }
}