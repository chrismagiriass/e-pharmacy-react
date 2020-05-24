import React, { Component } from 'react';
import CustomerService from '../../services/customerService';
import OrderService from '../../services/orderService';
import { Form, Col, InputGroup } from 'react-bootstrap';
import DataTable from "../basic/DataTable";
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';


class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            orders: [],
            customer: props.customer || {
                firstName: '',
                role: 'CUSTOMER',
                lastName: '',
                email: '',
                oldPassword: '',
                newPassword: '',
                afm: '',
                amka: '',
                address: {
                    city: '',
                    streetName: '',
                    streetNumber: '',
                    region: '',
                    zipCode: ''
                }
            }
        };

    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            let result = await CustomerService.getByUsername(user.username);
            let customer = {
                firstName: result.firstName,
                role: result.role,
                lastName: result.lastName,
                personId: result.personId,
                email: result.email,
                password: result.password,
                oldPassword: null,
                newPassword: null,
                afm: result.afm,
                amka: result.amka,
                address: result.address || {
                    city: '',
                    streetName: '',
                    streetNumber: '',
                    region: '',
                    zipCode: ''
                }
            }
            this.getOrders(user.username);
            this.setState({
                customer: customer
            });
        }
    }

    getOrders = (email) => {
        OrderService.getByEmail(email).then(result => {
            this.setState({ orders: result });
        }
        ).catch(error =>
            this.setState({
                error: error.message,
                success: ''
            })
        )
        
    }

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name.indexOf('address.') >= 0) {
            this.setState({
                customer: {
                    ...this.state.customer,
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

    handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(this.state.customer);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            CustomerService.post(this.state.customer).then(() => {
                if (this.state.customer.newPassword) {
                    localStorage.clear();
                    window.location.reload();
                }
            });
        }
    }

    dateFormatter =(cell, row, enumObject, rowIndex)=>{
       
        return  moment(new Date(row.orderDate)).format("DD-MM-YYYY HH:mm");

    }



    render() {

        const columns = [
            {
                dataField: 'orderId',
                text: 'Order No.',
                isKey: true,
                sort: true
            }, {
                dataField: 'orderDate',
                text: 'Order date',
                formatter: this.dateFormatter,
                sort: true,
            }, {
                dataField: 'prescriptionZipcode',
                text: 'Presc. code',
                sort: true
            }, {
                dataField: 'payment',
                text: 'Payment',
                sort: true
            }, {
                dataField: 'status',
                formatter: '',
                editable: false,
                text: 'Status'
            }
        ]

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
                                    disabled
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
                        <Form.Group as={Col} md="6" controlId="validationCustomPassword">
                            <Form.Label>Old Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="oldPassword"
                                    value={this.state.customer.oldPassword}
                                    onChange={this.changeHandler}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password is required.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustomPassword">
                            <Form.Label>New Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="newPassword"
                                    value={this.state.customer.newPassword}
                                    onChange={this.changeHandler}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password is required.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>VAT Reg. No</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="VAT Reg. No"
                                name="afm"
                                value={this.state.customer.afm}
                                onChange={this.changeHandler}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>AMKA</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="AMKA"
                                name="amka"
                                value={this.state.customer.amka}
                                onChange={this.changeHandler}
                            />

                        </Form.Group>
                    </Form.Row>

                    <Form.Row >
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

                    <button type="submit" className="btn btn-submit float-right">Update</button>
                </Form>
                <h1 class="mt-4">Your orders</h1>
                <DataTable key="showOrdersTable" columns={columns} data={this.state.orders} tableKey={'orderId'} pagination={paginationFactory()}/>
            </div>
        );
    }
}

export default ProfilePage;