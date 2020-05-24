import React, { Component } from 'react';
import Cart from './Cart';
import CustomerService from '../../services/customerService';
import OrderService from '../../services/orderService'
import CustomerInfo from './CustomerInfo';
import AlertMessage from '../basic/AlertMessage';
import { withRouter } from "react-router-dom";


class CheckoutForm extends Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            showLoginMessage: false,
            order: {
                productDTOList: [],
                addressInfoDto: {},
                customerId: '',
                payment: 'Pay on delivery',
                orderDate: '',
                status: 'PENDING',
                prescriptionZipcode: null
            },
            addressInfo: {},
            creaditCardMessage: '',
            errorMessage: '',
            prescripted:false,
        };

    }

    async componentDidMount() {

        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) {
            cart = [];
        }
        let presc=false;
        
        cart.map(item => {
                    if (item.prescripted){
                        presc=true;
                    }
                });

        this.setState({
            order: {
                ...this.state.order,
                productDTOList: cart,    
            },
            prescripted:presc
        });
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            const result = await CustomerService.getByUsername(user.username)
            let customer = {
                firstName: result.firstName,
                lastName: result.lastName,
                amka: result.amka,
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
                    productDTOList: cart
                },
                addressInfo: customer
            });
        }
    }

    onChangeQuantity = () => {
        let cartItems = localStorage.getItem("cart");
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            if (cartItems) {
                this.setState({
                    order: {
                        ...this.state.order,
                        productDTOList: cartItems
                    },
                })
            }
        }
    }

    removeCartItem = (id) => {
        let cartItems = localStorage.getItem("cart");
        let presc=false;
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            cartItems.map((item, index) => {
                if (item.productId === id) {
                    cartItems.splice(index, 1);
                }
                if (item.productId !== id&& item.prescripted){
                    presc=true;
                }
            })
            localStorage.setItem("cart", JSON.stringify(cartItems))

            this.setState({
                order: {
                    ...this.state.order,
                    productDTOList: cartItems
                },
                prescripted:presc
            })
        } else {
            this.setState({
                order: {
                    ...this.state.order,
                    productDTOList: []
                },
            })
        }
    }

    goToNext = (event) => {

        const { step } = this.state;
        if (step === 1 && !this.state.order.customerId) {
            // this.props.openLogin();
            this.setState({
                showLoginMessage: true,
            })
            window.scrollTo(0, 0);
            return;

        }
        if (step === 2) {
            const form = event.currentTarget;
            if (form.checkValidity() === false || !!this.state.creaditCardMessage) {
                event.preventDefault();
                event.stopPropagation();
                this.setState({ validated: true });
                return;

            } else {
                event.preventDefault();
                this.submitOrder();
            }
        }
        if (step !== 2) {
            this.setState({ step: step + 1 });
        }
    }

    goToPrevious = () => {
        const { step } = this.state;
        if (step !== 1) {
            this.setState({ step: step - 1 });
        }
    }

    submitOrder = () => {
        let created=false;
        this.state.order.addressInfoDto = this.state.addressInfo.address;
        this.state.order.addressInfoDto.fullName = (this.state.addressInfo.firstName + ' ' + this.state.addressInfo.lastName+' AMKA '+this.state.addressInfo.amka);
        this.state.order.orderDate = new Date();
        console.log(this.state.order);
        OrderService.post(this.state.order)
            .then(result => this.props.history.push('/profile'))
            .catch(err => { this.setState({ errorMessage: 'Something went wrong' }) }
            )
        
            
    }

    paymentHandler = (event) => {
        const value = event.target.value;
        if (value === 'Credit or Debit card') {
            this.setState({
                order: {
                    ...this.state.order,
                    payment: value
                },
                creaditCardMessage: 'You must provide your credit card info'
            })
        } else {
            this.setState({
                order: {
                    ...this.state.order,
                    payment: value
                },
                creaditCardMessage: ''
            })
        }
    }



    changePersciption=(event)=>{
        const name = event.target.name;
        const value = event.target.value;

            this.setState({
                order: {
                    ...this.state.order,
                    [name]: value,
                }
            })
    }


    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name.indexOf('address.') >= 0) {
            this.setState({
                addressInfo: {
                    ...this.state.addressInfo,
                    address: {
                        ...this.state.addressInfo.address,
                        [name.split(".")[1]]: value
                    }
                }
            })
        }
        else {
            this.setState({
                addressInfo: {
                    ...this.state.addressInfo,
                    [name]: value,
                }
            })
        }

    }

    handleCreditCardChange = ({ error }) => {
        if (error) {
            this.setState({ creaditCardMessage: error.message });
        } else {
            this.setState({ creaditCardMessage: '' });
        }
    };

    render() {

        switch (this.state.step) {
            case 1:
                return (
                    <>

                        {this.state.showLoginMessage ? <AlertMessage show={true} message={'Please login to continue!'} key={'cart-error'} variant={'danger'} /> : ''}

                        <Cart cartItems={this.state.order.productDTOList} onChangeQuantity={this.onChangeQuantity} removeCartItem={this.removeCartItem} onSubmit={this.goToNext} previous={this.goToPrevious} />
                    </>
                );
            case 2:
                return (
                    <>
                        {this.state.errorMessage ? <AlertMessage show={true} message={this.state.errorMessage} key={'cart-error'} variant={'danger'} /> : ''}

                        <CustomerInfo customer={this.state.addressInfo} changeHandler={this.changeHandler} onSubmit={this.goToNext} previous={this.goToPrevious}
                         payment={this.state.order.payment} onPaymentChange={this.paymentHandler} validated={this.state.validated} 
                         handleCreditCardChange={this.handleCreditCardChange} errorMessage={this.state.creaditCardMessage} 
                         prescripted ={this.state.prescripted}  order={this.state.order} changePersciption={this.changePersciption}/>
                    </>
                );
        }
    }
}

export default withRouter(CheckoutForm);
