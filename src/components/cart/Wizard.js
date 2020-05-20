import React, { Component } from 'react';
import Cart from './Cart';
import CustomerService from '../../services/customerService'
import CustomerInfo from './CustomerInfo';

class CheckoutForm extends Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            order: { productListDTO: [] ,addressInfo: {}},
            addressInfo: {}
            

        };

    }







    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (user === null) return;
        const result = await CustomerService.getByUsername(user.username)
        let customer = {
            firstName: result.firstName,
            lastName: result.lastName,
            address: result.address || {
                city: '',
                streetName: '',
                streetNumber: '',
                region: '',
                zipCode: ''
            }
        }

        this.setState({
            order: {
                ...this.state.order,
                customerId: result.personId,
                productListDTO: cart
            },
            addressInfo: customer
        });
    }


    onChangeQuantity = () => {
        let cartItems = localStorage.getItem("cart");
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            let total = 0;
            cartItems.map(item => total += item.finalPrice * item.quantity);
            if (cartItems) {
                this.setState({
                    order: {
                        ...this.state.order,
                        productListDTO: cartItems
                    },
                })
            }
        }
    }


    removeCartItem = (id) => {
        let cartItems = localStorage.getItem("cart");
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            cartItems.map((item, index) => {
                if (item.productId === id) {
                    cartItems.splice(index, 1);
                }
            })
            localStorage.setItem("cart", JSON.stringify(cartItems))

            this.setState({
                order: {
                    ...this.state.order,
                    productListDTO: cartItems
                },
            })
        } else {
            this.setState({
                order: {
                    ...this.state.order,
                    productListDTO: []
                },
            })
        }
    }




    goToNext = () => {
        const { step } = this.state;
        if (step !== 3) {
            this.setState({ step: step + 1 });
        } else {
            alert("Submitting");
            this.submitOrder();
        }
    }

    submitOrder=()=>{
        this.state.order.addressInfo = JSON.stringify(this.state.addressInfo);
        console.log(this.state.order);
    }




    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name.indexOf('address.') >= 0) {
            this.setState({
                addressInfo: {
                    address: {
                        ...this.state.addressInfo.address,
                        [name.split(".")[1]]: value
                    }
                }
            })
        } else {
            this.setState({
                addressInfo: {
                    ...this.state.addressInfo,
                    [name]: value,
                }
            })
        }

    }


    handleChange(field) {
        return evt => this.setState({ [field]: evt.target.value });
    }

    render() {
        switch (this.state.step) {
            case 1:
                return (
                    <Cart cartItems={this.state.order.productListDTO} onChangeQuantity={this.onChangeQuantity} removeCartItem={this.removeCartItem} onSubmit={this.goToNext} />
                );
            case 2:
                return (
                    <CustomerInfo customer={this.state.addressInfo} changeHandler={this.changeHandler}  onSubmit={this.goToNext}/>
                    // <CheckoutFormShipping
                    //   key="shipping"
                    //   onSubmit={this.goToNext}
                    //   shippingLine={this.state.shipping_line}
                    //   shippingCity={this.state.shipping_city}
                    //   shippingZip={this.state.shipping_zip}
                    //   onChangeShippingLine={this.handleChange("shipping_line")}
                    //   onChangeShippingCity={this.handleChange("shipping_city")}
                    //   onChangeShippingZip={this.handleChange("shipping_zip")}
                    // />
                );
            case 3:
                return (
                    <div>
                        the end
                        <button type="submit" className="btn btn-submit" onClick={this.goToNext}>Next</button>
                    </div>
                    // <CheckoutFormBilling
                    //   key="billing"
                    //   onSubmit={this.goToNext}
                    //   billingLine={this.state.billing_line}
                    //   billingCity={this.state.billing_city}
                    //   billingZip={this.state.billing_zip}
                    //   onChangeBillingLine={this.handleChange("billing_line")}
                    //   onChangeBillingCity={this.handleChange("billing_city")}
                    //   onChangeBillingZip={this.handleChange("billing_zip")}
                    // />
                );
        }
    }
}

export default CheckoutForm;
