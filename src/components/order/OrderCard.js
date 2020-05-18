import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./order.css";
import { Link, useHistory, withRouter } from 'react-router-dom';


class OrderCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="col-md-3">

                <Card className="mb-2 product-card">
                    <div class="item" >

                    </div>

                    <Card.Body>
                        <Card.Title>First wizard</Card.Title>
                        <Card.Text>
                            hello order
                        </Card.Text>
                        <Card.Text >
                        </Card.Text>

                        <Link >
                            <button className="btn btn-submit" >submit</button>
                        </Link>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default OrderCard;