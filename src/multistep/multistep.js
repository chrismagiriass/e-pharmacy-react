import React, { Component } from 'react'
import { Field, useField } from 'react-final-form'
import Wizard from './Wizard'
import { Form, Col, InputGroup } from 'react-bootstrap';
import Cart from '../components/cart/Cart';

import CustomerService from "../services/customerService";

class Multistep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: {},
            initialValues: {}
        }
        this.sleep.bind(this);
        this.onSubmit.bind(this);
        this.Error.bind(this);
        this.required.bind(this);

    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const cart = JSON.parse(localStorage.getItem("cart"));

        if (user === null) return;
        const result = await CustomerService.getByUsername(user.username)
        // .then(customer => {
        //     console.log(customer)
        //     this.setState({
        //         customer: customer,
        //         initialValues: {
        //             status: 'PENDING',
        //             customerId: customer.personId ,
        //             productDTOList: cart ? cart : []
        //         }
        //     });
        // }
        // ).catch(error =>
        //     console.error("Error from customer", error)
        // )
        this.setState({ customer: result });
    }


    sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    onSubmit = async values => {
        await this.sleep(300)
        window.alert(JSON.stringify(values, 0, 2))
    }

    Error = ({ name }) => (
        <Field
            name={name}
            subscribe={{ touched: true, error: true }}
            render={({ meta: { touched, error } }) =>
                touched && error ? <span>{error}</span> : null
            }
        />
    )

    required = value => (value ? undefined : 'Required')

    render() {
        // const user = JSON.parse(localStorage.getItem("user"));
        const cart = JSON.parse(localStorage.getItem("cart"));

        return (
            < div className="container" >
                <h3>Order checkout</h3>
                <Wizard
                    initialValues={{
                        status: 'PENDING',
                        customerId: this.state.customer.personId,
                        productDTOList: cart ? cart : []
                    }}
                    onSubmit={this.onSubmit}
                >
                    <Wizard.Page>
                        <Cart />
                    </Wizard.Page>
                    <Wizard.Page
                        validate={values => {
                            const errors = {}
                            if (!values.email) {
                                errors.email = 'Required'
                            }
                            if (!values.favoriteColor) {
                                errors.favoriteColor = 'Required'
                            }
                            return errors
                        }}
                    >
                        <div>
                            <label>Email</label>
                            <Field
                                name="email"
                                component="input"
                                type="email"
                                placeholder="Email"
                            />
                            <this.Error name="email" />
                        </div>
                        <div>
                            <label>Choose your payment method</label>
                            <Field name="favoriteColor" component="select">
                                <option />
                                <option >❤️ Cash</option>
                                <option >💚 PayPal</option>
                                <option >💙 CreditCard</option>
                            </Field>
                            <this.Error name="favoriteColor" />
                        </div>
                    </Wizard.Page>
                    <Wizard.Page
                        validate={values => {
                            const errors = {}
                            if (!values.toppings) {
                                errors.toppings = 'Required'
                            } else if (values.toppings.length < 2) {
                                errors.toppings = 'Choose more'
                            }
                            return errors
                        }}
                    >

                        <div>
                            <label>Toppings</label>
                            <Field name="toppings" component="select" multiple>
                                <option value="ham">🐷 Ham</option>
                                <option value="mushrooms">🍄 Mushrooms</option>
                                <option value="cheese">🧀 Cheese</option>
                                <option value="chicken">🐓 Chicken</option>
                                <option value="pineapple">🍍 Pinapple</option>
                            </Field>
                            <this.Error name="toppings" />
                        </div>
                    </Wizard.Page>
                    <Wizard.Page
                        validate={values => {
                            const errors = {}
                            if (!values.notes) {
                                errors.notes = 'Required'
                            }
                            return errors
                        }}
                    >
                        <div>
                            <label>Best Stooge?</label>
                            <div>
                                <label>
                                    <Field
                                        name="stooge"
                                        component="input"
                                        type="radio"
                                        value="larry"
                                    />{' '}
                            Larry
                        </label>
                                <label>
                                    <Field name="stooge" component="input" type="radio" value="moe" />{' '}
                            Moe
                        </label>
                                <label>
                                    <Field
                                        name="stooge"
                                        component="input"
                                        type="radio"
                                        value="curly"
                                    />{' '}
                        Curly
                        </label>
                            </div>
                        </div>
                        <div>
                            <label>Notes</label>
                            <Field name="notes" component="textarea" placeholder="Notes" />
                            <this.Error name="notes" />
                        </div>
                    </Wizard.Page>
                </Wizard>
            </div >
        )
    }
}
// render(<Multistep/>);

export default Multistep;

