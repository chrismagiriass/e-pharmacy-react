import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./products.css";
import { Link, withRouter } from 'react-router-dom';


class ProductCard extends Component {

    productDetails=(product)=> {
        this.props.history.push(`/products/${product.productId}`);
    }


    render() {

        let saleBadge = this.props.product.discount ? <span class="notify-badge">-{this.props.product.discount}%</span> : '';
        let startPrice = this.props.product.discount ? <span className="product-price-discount">  {this.props.product.price}€</span> : '';

        return (
            <div className="col-md-3">

                <Card className="mb-2 product-card">
                    <div class="item" >
                        <Link to={"/products/" + this.props.product.productId}>
                            {saleBadge}
                            <Card.Img variant="top" style={{ height: "250px" }} src={this.props.product.image} />
                        </Link>

                    </div>

                    <Card.Body>
                        <Card.Title>{this.props.product.name}</Card.Title>

                        <Card.Text >
                            {startPrice}
                            <span className="product-price">  {this.props.product.finalPrice}€</span>
                        </Card.Text>

                        <Link >
                            <button className="btn btn-submit align-end" onClick={() => { this.props.addToCart(this.props.product) }}  >Add to cart</button>
                        </Link>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default withRouter(ProductCard);