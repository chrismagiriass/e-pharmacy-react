import React, { Component } from "react";
import CategoryService from '../../services/categoryService';
import DataTable from "../basic/DataTable";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Pagination from "react-js-pagination";
import AddCategory from './AddCategory';
import { Type } from 'react-bootstrap-table2-editor';
import AddIcon from '@material-ui/icons/Add';


class ShowCategories extends Component {

    constructor(props) {
        super(props)
        // super(props)
        this.state = {
            categories: []
        }
        this.saveCategory = this.saveCategory.bind(this);
        this.buttonFormatterSave = this.buttonFormatterSave.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.buttonFormatterRemove = this.buttonFormatterRemove.bind(this)
        this.openAddCategory = this.openAddCategory.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    buttonFormatterSave(cell, row, enumObject, rowIndex) {
        //  console.log( row)
        return (
            <button
                className="btn btn-sm btn-outline-success"
                type="button"
                onClick={() =>
                    this.saveCategory(row)}
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
                    this.deleteCategory(row)}
            >
                <DeleteIcon />
            </button>
        )
    }

    saveCategory(category) {
        CategoryService.post(category).then(result => {
            this.setState({
                success: 'Category updated succesfully',
                error: ''
            })
        }
        ).catch(error =>
            this.setState({
                error: error.message,
                success: ''
            }));
    }

    deleteCategory(category) {
        CategoryService.deleteCategory(category.categoryId).then(result => {
            this.setState({ success: 'Category deleted succesfully', error: '' })
            CategoryService.get().then(result => {
                this.setState({
                    categories: result
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
            this.setState({ error:'You can not delete category assigned to product' }));

    }

    componentDidMount() {
        CategoryService.get().then(result => {
            this.setState({
                categories: result
            });
        }
        ).catch(error =>
            this.setState({ error: error.message, success: '' })
        )
    }


    getCategories = () => {
        CategoryService.get( ).then(result => {
            this.setState({
                categories: result
            });
        }
        ).catch(error =>
            console.error("Error from category", error)
        )
    }

    openAddCategory() {
        this.setState({ showModal: true });

    }

    closeModal() {
        this.setState({ showModal: false });
        this.getCategories();

    }


    render() {

        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true
        })


        const columns = [
            {
                dataField: 'categoryId',
                text: 'Category ID',
                isKey: true,
                sort: false,
                editable: false
            }, {
                dataField: 'nameCategory',
                text: 'Title',
                style: {
                    maxWidth: '200px'
                },
                editor: {
                    type: Type.TEXTAREA
                },
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
                <h1 class="mt-4">Categories</h1>
                {message}
                <button className="btn btn-sm btn-outline-success"
                    title="Add category"
                    type="button"
                    onClick={() =>
                        this.openAddCategory()}
                ><AddIcon /></button>
                <DataTable key="showCategoriesTable" columns={columns} data={this.state.categories} cellEdit={cellEdit} tableKey={'categoryId'} />
                <AddCategory key={"registerModal"} showModal={this.state.showModal} onHide={this.closeModal} title={this.state.modalTitle} />

            </>
        )

    }
}
export default ShowCategories;