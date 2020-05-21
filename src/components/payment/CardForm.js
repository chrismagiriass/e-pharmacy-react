import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

class _CardForm extends Component {
    state = {
        errorMessage: '',
    };

    handleChange = ({ error }) => {
        if (error) {
            this.setState({ errorMessage: error.message });
        }else{
            this.setState({ errorMessage:'' }); 
        }
    };

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
                <form onSubmit={this.handleSubmit.bind(this)} className="card-container">
                    <p style={{float:'left',
                    margin:'12px'
                }}> Card details</p>
                
                    <label className="col-md-12"> 
              <CardElement
                            onChange={this.handleChange}
                        // {...createOptions()}
                        />
                    </label>
                    <div className="error" role="alert">
                        {this.state.errorMessage}
                    </div>
                    {/* <button className="btn btn-primary" >Pay</button> */}
                </form>
          
        );
    }
}

const CardForm = injectStripe(_CardForm);

export default class CardDemo extends Component {
    render() {
        return (
            <StripeProvider apiKey="pk_RXwtgk4Z5VR82S94vtwmam6P8qMXQ">
                <Elements>
                    <CardForm handleResult={this.props.handleResult} />
                </Elements>
            </StripeProvider>
        );
    }
}