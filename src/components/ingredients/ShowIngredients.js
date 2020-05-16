import React, { Component } from 'react';
import IngredientCard from './IngredientCard';
import { Container } from 'react-bootstrap';
import "./ingredients.css";
import SearchBar from '../basic/SearchBar';
import IngredientService from '../../services/ingredientService';
import Pagination from "react-js-pagination";

class ShowIngredients extends Component {



    constructor(props) {
        super(props)
        this.state = {
            ingredients: [],
            activePage: 1,
            itemsPerPage: 12,
            totalItems: 0,
            sort: 'name'
        }
        this.getIngredients.bind(this)

    }

    componentDidMount() {
        IngredientService.get(
            {
                params: {
                    page: this.state.activePage - 1,
                    sort: this.state.sort,
                    size: this.state.itemsPerPage
                }
            }
        ).then(result => {
            this.setState({
                ingredients: result.results,
                totalItems: result.totalItems
            });
        }
        ).catch(error =>
            console.error("Error from ingredients", error)
        )
    }


    getIngredients(pageNumber) {
        IngredientService.get(
            {
                params: {
                    page: pageNumber - 1,
                    sort: this.state.sort,
                    size: this.state.itemsPerPage
                }
            }
        ).then(result => {
            this.setState({
                ingredients: result.results,
                totalItems: result.totalItems
            });
        }
        ).catch(error =>
            console.error("Error from ingredients", error)
        )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
        this.getIngredients(pageNumber);
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
                            {this.state.ingredients.map((ingredient, i) => <IngredientCard key={ingredient.ingredientId} ingredient={ingredient} />)}
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

export default ShowIngredients;