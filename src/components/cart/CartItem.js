import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';


class CartItem extends Component {

    changeQuantity(event) {
        console.log(event.target.value);
        let cartItems = localStorage.getItem("cart");
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            cartItems.map((item) => {
                if (item.productId === this.props.item.productId) {
                    item.quantity = event.target.value;
                }
            })
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
        this.props.onChangeQuantity();
    }



    render() {
        let stock = this.props.item.stock ? <span class="text-success"><strong>In Stock</strong></span> : <span class="text-danger"><strong>Out of Stock</strong></span>;
        let total = this.props.item.finalPrice * this.props.item.quantity;

        return (

            <tr>
                <td class="col-sm-8 col-md-6">
                    <div class="media">
                        <a class="thumbnail pull-left" href={"/products/"+this.props.item.productId}> <img class="media-object" src={this.props.item.image} /> </a>
                        <div class="media-body">
                            <h4 class="media-heading"><a href={"/products/"+this.props.item.productId}>{this.props.item.name}</a></h4>
                            <span>Status: </span>{stock}
                        </div>
                    </div></td>
                <td class="col-sm-1 col-md-1" >
                    <input type="number" class="form-control" id="exampleInputEmail1" value={this.props.item.quantity} onChange={this.changeQuantity.bind(this)} />
                </td>
                <td class="col-sm-1 col-md-1 text-center"><strong>€{this.props.item.finalPrice}</strong></td>
                <td class="col-sm-1 col-md-1 text-center"><strong>€{total}</strong></td>
                <td class="col-sm-1 col-md-1">
                    <button type="button" class="btn btn-outline-danger btn-sm" onClick={() => { this.props.remove(this.props.item.productId) }}>
                        <DeleteIcon />
                    </button></td>
            </tr>

        );
    }
}

export default CartItem;