import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Container, Dropdown } from 'react-bootstrap';
import "./products.css";
import SearchBar from '../basic/SearchBar';
import ProductService from '../../services/productService';
import Pagination from "react-js-pagination";

class ShowProducts extends Component {



    constructor(props) {
        super(props)
        this.state = {
            products: [],
            activePage: 1,
            itemsPerPage: 12,
            totalItems: 0,
            sort: 'name',
            order: 'ASC',
            searchFilters: {
                productName: '',
                categoryList: [],
                discount: false,
                prescripted: false,
                minPrice: 0,
                maxPrice: 200,
                stock: false
            },
        }

        this.getProducts.bind(this)

    }

    componentDidMount() {
        ProductService.get(
            {
                params: {
                    page: this.state.activePage - 1,
                    sort: this.state.sort,
                    size: this.state.itemsPerPage
                }
            }
        ).then(result => {
            this.setState({
                products: result.results,
                totalItems: result.totalItems
            });
        }
        ).catch(error =>
            console.error("Error from product", error)
        )
    }


    getProducts(pageNumber,sort,order) {
        ProductService.search(this.state.searchFilters,
            {
                params: {
                    page: pageNumber - 1,
                    order: order,
                    sort: sort,
                    size: this.state.itemsPerPage
                }
            }
        )
            .then(result => this.setState({
                products: result.results,
                totalItems: result.totalItems,
                activePage: 1
            })).catch(error =>
                console.error("Error from product", error)
            )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
        this.getProducts(pageNumber,this.state.sort,this.state.order);
    }

    sortHandler = (event,key) => {
        const value = event;
        let split = value.split('.');
        this.setState({
            sort: split[0],
            order: split[1]
        })
        this.getProducts(1,split[0], split[1]);
    }

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            searchFilters: {
                ...this.state.searchFilters,
                [name]: value,
            }
        })

    }

    checkboxHandler = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        this.setState({
            searchFilters: {
                ...this.state.searchFilters,
                [name]: value,
            }
        })
    }

    searchProducts = (categoryIds) => {
        this.state.searchFilters.categoryList = categoryIds;
        ProductService.search(this.state.searchFilters,
            {
                params: {
                    page: 0,
                    order: this.state.order,
                    sort: this.state.sort,
                    size: this.state.itemsPerPage
                }
            }
        )
            .then(result => this.setState({
                products: result.results,
                totalItems: result.totalItems,
                activePage: 1
            }))
    }



    render() {



        return (
            <div className="row">
                <div className="col-md-2">
                    <SearchBar searchFilters={this.state.searchFilters} changeHandler={this.changeHandler} searchProducts={this.searchProducts} checkboxHandler={this.checkboxHandler} />
                </div>
                <div className="col-md-10">
                    <Container fluid={true} >
                        <div className='row my-md-3'>
                            <div className='col-md-12'>
                                <Dropdown className='float-right' onSelect={this.sortHandler}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Sort by
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu  >
                                        <Dropdown.Item eventKey={'price.ASC'}>Price: lowest first</Dropdown.Item>
                                        <Dropdown.Item eventKey={'price.DESC'}>Price: highest first</Dropdown.Item>
                                        <Dropdown.Item eventKey={'name.ASC'}>Alphabetically</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="row">
                            {this.state.products.map((product, i) => <ProductCard addToCart={() => this.props.addToCart(product)} key={product.productId} product={product} />)}
                        </div>
                        <div className="row d-flex justify-content-center">
                            <Pagination
                                activePage={this.state.activePage}
                                itemClass="page-item"
                                linkClass="page-link"
                                itemsCountPerPage={this.state.itemsPerPage}
                                totalItemsCount={this.state.totalItems}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ShowProducts;