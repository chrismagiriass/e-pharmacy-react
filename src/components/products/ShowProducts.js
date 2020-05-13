import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Container } from 'react-bootstrap';
import "./products.css";
import SearchBar from '../basic/SearchBar';
import ProductService from '../../services/productService';

class ShowProducts extends Component {

    constructor(props) {
        super(props)
        this.state = { products: [] }

    }
    componentDidMount() {
        ProductService.get().then(result => {
            this.setState({ products: result });
        }
        ).catch(error =>
            console.error("Error from product", error)
        )
    }



    render() {



        return (
            <div className="row">
                <div className="col-md-2">
                    <SearchBar />
                </div>
                <div className="col-md-10">
                    <Container fluid={true} >

                        <div className="row">
                            {this.state.products.map((product,i) => <ProductCard key={product.productId}  product={product}/>)}
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ShowProducts;