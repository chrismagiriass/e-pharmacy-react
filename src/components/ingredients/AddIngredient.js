import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import IngredientService from '../../services/ingredientService';
import { withRouter } from "react-router-dom";
import { Form, Col, InputGroup } from 'react-bootstrap';


class AddIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            ingredient: this.props.ingredient || {
                name: '',
                description: '',
                image: '',
                discount: '',
                price: '',
                stock: ''
            },
            selectedCategories: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

    }
    changeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            ingredient: {
                ...this.state.ingredient,
                [name]: value,
            }
        })

    }

    handleSubmit(event) {
        const form = event.currentTarget;
        console.log(this.state.ingredient);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            IngredientService.post(this.state.ingredient);
            this.props.onHide();
        }
    }


    render() {
  
        return (
            <Modal show={this.props.showModal}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.ingredient.name}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="3" 
                                        type="text"
                                        placeholder="description"
                                        name="description"
                                        value={this.state.ingredient.description}
                                        onChange={this.changeHandler}
                                    />

                                </Form.Group>
                          
                                <Form.Group as={Col} md="12" >
                                    <Form.Label>Image</Form.Label>
                                    <InputGroup>
                                    <Form.Control as="textarea" rows="3" 
                                            type="url"
                                            placeholder="image"
                                            // required
                                            name="image"
                                            value={this.state.ingredient.image}
                                            onChange={this.changeHandler}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12" >
                                    <Form.Label>Price</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            placeholder="price"
                                            required
                                            name="price"
                                            value={this.state.ingredient.price}
                                            onChange={this.changeHandler}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12" >
                                    <Form.Label>Discount</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            placeholder="Discount"
                                            name="discount"
                                            value={this.state.ingredient.discount}
                                            onChange={this.changeHandler}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12" >
                                    <Form.Label>Stock</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            placeholder="Stock"
                                            required
                                            name="stock"
                                            value={this.state.ingredient.stock}
                                            onChange={this.changeHandler}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <button type="submit" className="btn btn-submit float-right">Save</button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default withRouter(AddIngredient);