import React, { Component } from 'react'
// import { render } from 'react-dom'
import { Field } from 'react-final-form'
import Wizard from './Wizard'
import { Form, Col, InputGroup } from 'react-bootstrap';

import CustomerService from "../services/customerService";
// import ProductService from '../services/productService';
// import CustomerForm from '../components/customers/CustomerForm';

class Multistep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: ''
        }
        this.sleep.bind(this);
        this.onSubmit.bind(this);
        this.Error.bind(this);
        this.required.bind(this);

    }

    componentDidMount() {

        CustomerService.getById('6').then(customer => {
            this.setState({
                customer: customer
            });
        }
        ).catch(error =>
            console.error("Error from customer", error)
        )
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
        return (
            < div className="container" >
                <h1>fianalize your order</h1>
                <Wizard
                    initialValues={{ employed: true, stooge: 'larry' }}
                    onSubmit={this.onSubmit}
                >
                    <Wizard.Page>
                        <h2>Your delivery details:</h2>
                        <Form.Group as={Col} md="6">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                name="firstName"
                                value={this.state.customer.firstName}
                                // onChange={this.changeHandler}
                                validate={this.required}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                name="lastName"
                                value={this.state.customer.lastName}
                                // onChange={this.changeHandler}
                                validate={this.required}

                            />
                            <this.Error name="lastName" />
                        </Form.Group>
                        {/* <div>
                            <label>First Name</label>
                            <Field
                                name="firstName"
                                component="input"
                                type="text"
                                placeholder={this.state.customer.firstName}
                                validate={this.required}
                            />
                            <this.Error name="firstName" />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <Field
                                name="lastName"
                                component="input"
                                type="text"
                                placeholder="Last Name"
                                validate={this.required}
                            />
                            <this.Error name="lastName" />
                        </div> */}
                        <Form.Group as={Col} md="6">

                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                name="lastName"
                                component="input"
                                type="text"
                                placeholder="Last Name"
                            // validate={this.required}
                            />
                            <this.Error name="lastName" />
                            <Form.Group>
                                <Form.Check>Change your delivery address: </Form.Check>
                                <Field name="employed" component="input" type="checkbox" />
                            </Form.Group>
                        </Form.Group>

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

