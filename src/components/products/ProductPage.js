import React, { Component } from 'react';
import "./products.css";
import ProductService from '../../services/productService';
import RatingStar from './RatingStar'


class ShowProducts extends Component {



    constructor(props) {
        super(props)
        this.state = {
            product: {},
            cart: []
        }
    }

    componentDidMount() {

        ProductService.getById(
            this.props.match.params.productId
        ).then(result => {
            this.setState({
                product: result
            });
        }
        ).catch(error =>
            console.error("Error from product", error)
        )
    }

    addToCard = (product) => {
        let cartItems = [];
        let cart = localStorage.getItem("cart");
        if (cart) {
            cartItems = JSON.parse(cart);
        }
        let productExists = cartItems.filter(item => item.productId === product.productId);
        product.quantity = 1;
        if (productExists.length > 0) {
            productExists[0].quantity++;
        } else {
            cartItems.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cartItems))
    }


    render() {

        let saleBadge = this.state.product.discount ? <span class="notify-badge badge-big">-{this.state.product.discount}%</span> : '';
        let startPrice = this.state.product.discount ? <span className="product-price-discount">  {this.state.product.price}€</span> : '';
        let stock = this.state.product.stock ? <span className="badge badge-success">  {"In stock: " + this.state.product.stock}</span> : <span className="badge badge-danger">  {"Out of stock "}</span>;

        return (


            <div class="container" id="product-section">
                <div class="row">
                    <div class="col-md-6">
                        {saleBadge}
                        <img style={{ 'max-width': '512px' }}
                            src={this.state.product.image}
                            alt={this.state.product.name}
                            class="image-responsive"
                        />
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12">
                                <h3>{this.state.product.name}</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p>
                                    {stock}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <h5>Description</h5>
                                <p class="description">
                                    {this.state.product.description}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <span className="product-price">Price: </span>    {startPrice}
                                <span className="product-price">  {this.state.product.finalPrice}€</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button style={{ 'margin-top': '20px' }} className="btn btn-submit" onClick={() => this.props.addToCart(this.state.product)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div class="row" >
                    <div class="col-md-6 offset-md-3">
                        <RatingStar value={3} />
                        <div class="well well-sm">

                            <div class="row" id="post-review-box">
                                <div class="col-md-12">
                                    <form accept-charset="UTF-8" action="" method="post">
                                        <input id="ratings-hidden" name="rating" type="hidden" />
                                        <textarea class="form-control animated" cols="50" id="new-review" name="comment" placeholder="Enter your review here..." rows="5"></textarea>

                                        <div class="text-right">
                                            <button class="btn btn-outline-secondary btn-md" type="submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

export default ShowProducts;