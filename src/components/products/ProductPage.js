import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./products.css";
import ProductService from '../../services/productService';


class ShowProducts extends Component {



    constructor(props) {
        super(props)
        this.state = {
            product: {},
            cart:[]
        }
        this.addToCard.bind(this);
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

    addToCard(product){
        let cartItems=[];
       let cart= localStorage.getItem("cart");
        if(cart){
            cartItems = JSON.parse(cart);
        }
        let productExists= cartItems.filter(item=>item.productId===product.productId);
        product.quantity=1;
        if(productExists.length>0){
            productExists[0].quantity++;
        }else{
            cartItems.push(product);
        }
     
        localStorage.setItem("cart",JSON.stringify(cartItems))
      
        this.props.test15();
    }


    render() {

        let saleBadge = this.state.product.discount ? <span class="notify-badge badge-big">-{this.state.product.discount}%</span> : '';
        let startPrice = this.state.product.discount ? <span className="product-price-discount">  {this.state.product.price}€</span> : '';
        let stock = this.state.product.stock ? <span className="in-stock">  {"In stock: " + this.state.product.stock}</span> : <span className="out-stock">  {"Out of stock "}</span>;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className=" col-md-offset-2">
                        <Card className="mb-2 product-card">
                            <div class="item">
                                {saleBadge}
                                <Card.Img variant="top" src="/slider1.png" />
                            </div>

                            <Card.Body>
                                <Card.Title>{this.state.product.name}
                                </Card.Title>
                                <Card.Text>
                                    <p>
                                        {stock}
                                    </p>
                                    {this.state.product.description}
                                </Card.Text>
                                <Card.Text >
                                    {startPrice}
                                    <span className="product-price">  {this.state.product.finalPrice}€</span>
                                </Card.Text>
                                    <button className="btn btn-submit" onClick={() => { this.addToCard(this.state.product) }}>Add to cart</button>
                                
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>

        );
    }
}

export default ShowProducts;