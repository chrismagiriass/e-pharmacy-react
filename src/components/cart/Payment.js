import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CardDemo from '../payment/CardForm';


class Payment extends Component {

    constructor() {
        super();
        this.state = { stripe: null };
    }

    componentDidMount() {

    }

    render() {

        const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');
        return (
            <div class="container cart-container">
            
                    <CardDemo/>
                        
                <button type="button" class="btn btn-outline-secondary" onClick={this.props.previous}> Previous  </button>

            </div>
        );
    }
}

export default Payment;