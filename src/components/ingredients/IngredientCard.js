import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./ingredients.css";
import { Link, withRouter } from 'react-router-dom';


class IngredientCard extends Component {

    constructor(props) {
        super(props);
        this.ingredientDetails.bind(this)
    }

    ingredientDetails(ingredient) {
        this.props.history.push(`/ingredients/${ingredient.ingredientId}`);
    }

    render() {

        let saleBadge = this.props.ingredient.discount ? <span class="notify-badge">-{this.props.ingredient.discount}%</span> : '';
        let startPrice = this.props.ingredient.discount ? <span className="ingredient-price-discount">  {this.props.ingredient.price}€</span> : '';

        return (
            <div className="col-md-3">

                <Card className="mb-2 ingredient-card">
                    <div class="item" >
                        <Link to={"/ingredients/" + this.props.ingredient.ingredientId}>
                            {saleBadge}
                            <Card.Img variant="top" src="/slider1.png" />
                        </Link>

                    </div>

                    <Card.Body>
                        <Card.Title>{this.props.ingredient.name}</Card.Title>
                        <Card.Text>
                            {this.props.ingredient.description}
                        </Card.Text>
                        <Card.Text >
                            {startPrice}
                            <span className="ingredient-price">  {this.props.ingredient.finalPrice}€</span>
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

export default withRouter(IngredientCard);