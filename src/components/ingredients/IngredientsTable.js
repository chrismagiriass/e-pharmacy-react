import React, { Component } from "react";
import IngredientService from '../../services/ingredientService';
import DataTable from "../basic/DataTable";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Pagination from "react-js-pagination";
import AddIngredient from './AddIngredient';
import { Type } from 'react-bootstrap-table2-editor';
import PostAddIcon from '@material-ui/icons/PostAdd';



class ShowIngredients extends Component {

    constructor(props) {
        super(props)
        // super(props)
        this.state = {
            ingredients: [],
            error: '',
            activePage: 1,
            itemsPerPage: 12,
            totalItems: 0,
            sort: 'name',
            success: '',
            showModal: false
        }
        this.saveIngredient = this.saveIngredient.bind(this);
        this.buttonFormatterSave = this.buttonFormatterSave.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
        this.buttonFormatterRemove = this.buttonFormatterRemove.bind(this)
        this.openAddIngredient = this.openAddIngredient.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    buttonFormatterSave(cell, row, enumObject, rowIndex) {
        //  console.log( row)
        return (
            <button
                className="btn btn-sm btn-outline-success"
                type="button"
                onClick={() =>
                    this.saveIngredient(row)}
            >
                <SaveIcon />
            </button>
        )
    }

    buttonFormatterRemove(cell, row, enumObject, rowIndex) {
        //  console.log( row)
        return (
            <button
                className="btn btn-sm btn-outline-danger"
                type="button"
                onClick={() =>
                    this.deleteIngredient(row)}
            >
                <DeleteIcon />
            </button>
        )
    }

    saveIngredient(ingredient) {
        IngredientService.post(ingredient).then(result => {
            this.setState({
                success: 'Ingredient updated succesfully',
                error: ''
            })
        }
        ).catch(error =>
            this.setState({
                error: error.message,
                success: ''
            }));
    }

    deleteIngredient(ingredient) {
        IngredientService.deleteIngredient(ingredient.ingredientId).then(result => {
            this.setState({ success: 'Ingredient deleted succesfully', error: '' })
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
                this.setState({
                    error: error.message,
                    success: ''
                })
            )
        }
        ).catch(error =>
            this.setState({ error: error.message }));

    }

    componentDidMount() {
        IngredientService.get({
            params: {
                page: this.state.activePage - 1,
                sort: this.state.sort,
                size: this.state.itemsPerPage
            }
        }).then(result => {
            this.setState({
                ingredients: result.results,
                totalItems: result.totalItems
            });
        }
        ).catch(error =>
            this.setState({ error: error.message, success: '' })
        )
    }


    getIngredients = (pageNumber) => {
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
            console.error("Error from ingredient", error)
        )
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
        this.getIngredients(pageNumber);
    }

    openAddIngredient() {
        this.setState({ showModal: true });

    }

    closeModal() {
        this.setState({ showModal: false });
        this.getIngredients(1);

    }


    render() {

        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true
        })


        const columns = [
            {
                dataField: 'ingredientId',
                text: 'Ingredient ID',
                isKey: true,
                sort: false,
                editable: false
            }, {
                dataField: 'name',
                text: 'Title',
                style: {
                    maxWidth: '200px'
                },
                editor: {
                    type: Type.TEXTAREA
                },
                sort: true
            }, {
                dataField: 'description',
                text: 'Description',
                sort: true,
                style: {
                    maxHeight: '90px',
                    maxWidth: '270px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    border: 'none'
                }
            }, {
                dataField: 'image',
                text: 'Image',
                editor: {
                    type: Type.TEXTAREA
                },
                style: {
                    maxHeight: '90px',
                    maxWidth: '270px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    border: 'none'
                },
                sort: false
            }, {
                dataField: 'discount',
                text: 'Discount',
                sort: true,
            }, {
                dataField: 'stock',
                text: 'Stock',
                sort: true

            }, {
                dataField: 'price',
                text: 'Price',
                sort: true
            }, {
                formatter: this.buttonFormatterSave,
                editable: false,
                text: ""
            }, {
                formatter: this.buttonFormatterRemove,
                editable: false,
                text: ""
            }
        ]

        let message = '';

        if (this.state.success) {
            message = <div class="alert alert-success alert-dismissible fade show" role="alert">
                {this.state.success}
            </div>
        }
        if (this.state.error) {
            message = <div class="alert alert-danger" role="alert">
                {this.state.error}
            </div>
        }

        return (
            <>
                <h1 class="mt-4">Ingredients</h1>
                {message}
                <button className="btn btn-sm btn-outline-success"
                    title="Add ingredient"
                    type="button"
                    onClick={() =>
                        this.openAddIngredient()}
                ><PostAddIcon /></button>
                <DataTable key="showIngredientsTable" columns={columns} data={this.state.ingredients} cellEdit={cellEdit} tableKey={'ingredientId'} />
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
                <AddIngredient key={"registerModal"} showModal={this.state.showModal} onHide={this.closeModal} title={this.state.modalTitle} />

            </>
        )

    }
}
export default ShowIngredients;