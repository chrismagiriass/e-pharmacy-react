import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./products.css";
import { Link, useHistory, withRouter } from 'react-router-dom';


class ProductCard extends Component {

    constructor(props) {
        super(props);
        this.productDetails.bind(this)
    }

    productDetails(product) {
        // useHistory().push(`products/${product.productId}`)
        //     let path = `/products/${product.productId}`;
        //     let history = useHistory();
        //    return  history.push(path);

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
                            <Card.Img variant="top" src="/slider1.png" />
                        </Link>

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

                        <Link >
                            <button className="btn btn-submit" >Add to cart</button>
                        </Link>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default withRouter(ProductCard);