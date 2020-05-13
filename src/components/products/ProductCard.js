import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import "./products.css";


class ProductCard extends Component {

    constructor(props){
        super(props);
        console.log(props);
    }

    render() {

        return (
            <div className="col-md-3">
                <Card className="mb-2">
                    <Card.Img variant="top" src="/slider1.png" />
                    <Card.Body>
                        <Card.Title>{this.props.product.name}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
              </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ProductCard;