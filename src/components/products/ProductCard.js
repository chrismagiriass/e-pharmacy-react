import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./products.css";
import { Link } from 'react-router-dom';


class ProductCard extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {

        let saleBadge = this.props.product.discount ? <span class="notify-badge">-{this.props.product.discount}%</span> : '';
        let startPrice = this.props.product.discount ? <span className="product-price-discount">  {this.props.product.price}€</span> : '';

        return (
            <div className="col-md-3">
                <Card className="mb-2 product-card">
                    <div class="item">
                        {saleBadge}
                        <Card.Img variant="top" src="/slider1.png" />
                    </div>

                    <Card.Body>
                        <Card.Title>{this.props.product.name}</Card.Title>
                        <Card.Text>
                            {this.props.product.description}
                        </Card.Text>
                        <Card.Text >
                            {startPrice}
                            <span className="product-price">  {this.props.product.finalPrice}€</span>
                        </Card.Text>
                        <Link to={"/products/" + this.props.product.productId}>
                            <button className="btn btn-submit" >Add to cart</button>
                        </Link>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ProductCard;