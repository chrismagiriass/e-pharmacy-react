import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import ProductService from "../../services/productService";
import { withRouter } from "react-router-dom";
import { Form, Col, InputGroup } from 'react-bootstrap';
import MultiSelect from "react-multi-select-component";


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            product: this.props.product || {
                name: '',
                description: '',
                productCategoryList: [],
                prescripted: '',
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
            product: {
                ...this.state.product,
                [name]: value,
            }
        })

    }

    handleSubmit(event) {
        const form = event.currentTarget;
        console.log(this.state.product);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            let categories = this.state.selectedCategories.map(function (row) {
                return { categoryId: row.value, nameCategory: row.label }
            })
            this.state.product.productCategoryList = categories;

            ProductService.post(this.state.product);
            this.props.onHide();
        }
    }

    changeCategory = (value) => {
        console.log(value);

        this.setState({
            selectedCategories: value
        })

    }

    render() {
        const options = this.props.categories.map(function (row) {
            return { value: row.categoryId, label: row.nameCategory }
        })

        return (
            <Modal show={this.props.showModal}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new product</Modal.Title>
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
                                        value={this.state.product.name}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="3" 
                                        type="text"
                                        placeholder="description"
                                        name="description"
                                        value={this.state.product.description}
                                        onChange={this.changeHandler}
                                    />

                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Categories</Form.Label>
                                    <MultiSelect
                                        options={options}
                                        value={this.state.selectedCategories}
                                        onChange={this.changeCategory}
                                        labelledBy={"Select"}
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
                                            value={this.state.product.image}
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
                                            value={this.state.product.price}
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
                                            value={this.state.product.discount}
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
                                            value={this.state.product.stock}
                                            onChange={this.changeHandler}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Check
                                        required
                                        label="Prescripted"
                                        value={this.state.product.prescripted}
                                        onChange={this.changeHandler}
                                        name="prescripted"
                                    />

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

export default withRouter(AddProduct);