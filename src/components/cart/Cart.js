import React, { Component } from 'react';
import CartItem from './CartItem';


class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subtotal: 0,
            shipping: 0
        };
        this.remove.bind(this);
        this.onChangeQuantity.bind(this);
    }
    componentDidMount() {
        let cartItems = localStorage.getItem("cart");
        let total = 0;
        cartItems = JSON.parse(cartItems);

        cartItems.map(item => total += item.finalPrice * item.quantity);
        if (cartItems) {
            this.setState({
                cart: cartItems,
                subtotal: total,
                shipping: 0
            })
        }
    }

    remove(id) {
        this.props.removeCartItem(id);
        let cartItems = localStorage.getItem("cart");
        let total = 0;
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            cartItems.map(item => total += item.finalPrice * item.quantity);
        
            this.setState({
                subtotal: total,
                shipping: 0
            })
        } else {
            this.setState({
                subtotal: 0,
                shipping: 0
            })
        }
      
    }

    onChangeQuantity() {
        this.props.onChangeQuantity();
        let cartItems = localStorage.getItem("cart");
        let total = 0;
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            cartItems.map(item => total += item.finalPrice * item.quantity);
            if (cartItems) {
                this.setState({
                    subtotal: total,
                    shipping: 3
                })
            }
        }

    }



    render() {


        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-10 col-md-offset-1">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th class="text-center">Price</th>
                                    <th class="text-center">Total</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.cartItems.map(item => {
                                    return <CartItem item={item} remove={() => this.remove(item.productId)} onChangeQuantity={() => this.onChangeQuantity()} />
                                })}

                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td><h5>Subtotal</h5></td>
                                    <td class="text-right"><h5><strong>{this.state.subtotal}€</strong></h5></td>
                                </tr>
                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td><h5>Estimated shipping</h5></td>
                                    <td class="text-right"><h5><strong>{this.state.shipping}€</strong></h5></td>
                                </tr>
                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td><h3>Total</h3></td>
                                    <td class="text-right"><h3><strong>${this.state.shipping + this.state.subtotal}€</strong></h3></td>
                                </tr>
                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>
                                        <button type="button" class="btn btn-default">
                                            <span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                </button></td>
                                    <td>
                                        <button type="button" class="btn btn-submit" onClick={this.props.onSubmit}>
                                            Checkout <span class="glyphicon glyphicon-play"></span>
                                        </button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;