import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Container } from 'react-bootstrap';
import "./products.css";
import SearchBar from '../basic/SearchBar';
// import CustomerForm from '../customers/CustomerForm';
// import LoginForm from '../customers/LoginForm';

class ShowProducts extends Component {


    render() {

        return (
            <div className="row">
                <div className="col-md-2">
                    <SearchBar />
                </div>
                <div className="col-md-10">
                    <Container fluid={true} className="product-container">
                        <div className="row">
                            <ProductCard className="col-md-2" />
                            <ProductCard className="col-md-2" />
                            <ProductCard className="col-md-2" />
                            <ProductCard className="col-md-2" />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ShowProducts;