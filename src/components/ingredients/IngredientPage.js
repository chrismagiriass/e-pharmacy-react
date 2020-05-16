import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./ingredients.css";
import { Link } from 'react-router-dom';
import IngredientService from '../../services/ingredientService';


class ShowIngredients extends Component {



    constructor(props) {
        super(props)
        this.state = {
            ingredient: {}
        }

    }

    componentDidMount() {

        IngredientService.getById(
            this.props.match.params.ingredientId
        ).then(results => {
            this.setState({
                ingredient: results
            });
        }
        ).catch(error =>
            console.error("Error from ingredient", error)
        )
    }


    render() {

        let saleBadge = this.state.ingredient.discount ? <span class="notify-badge">-{this.state.ingredient.discount}%</span> : '';
        let startPrice = this.state.ingredient.discount ? <span className="ingredient-price-discount">  {this.state.ingredient.price}€</span> : '';
        let stock = this.state.ingredient.stock ?"Int stock": "Out of stock";

        return (
            <div className="row">
                <div className="col-md-3">
                    <Card className="mb-2 ingredient-card">
                        <div class="item">
                            {saleBadge}
                            <Card.Img variant="top" src="/slider1.png" />
                        </div>

                        <Card.Body>
                            <Card.Title>{this.state.ingredient.name}</Card.Title>
                            <Card.Text>
                                {this.state.ingredient.description}
                                {stock}
                            </Card.Text>
                            <Card.Text >
                                {startPrice}
                                <span className="ingredient-price">  {this.state.ingredient.finalPrice}€</span>
                            </Card.Text>
                            <Link to={"/ingredients/" + this.state.ingredient.ingredientId}>
                                <button className="btn btn-submit" >Add to cart</button>
                            </Link>

                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default ShowIngredients;