import React, { Component } from "react";
import CategoryService from '../../services/categoryService';
import ProductService from '../../services/productService';
import DataTable from "../basic/DataTable";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Pagination from "react-js-pagination";
import AddProduct from './AddProduct';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Type } from 'react-bootstrap-table2-editor';
import PostAddIcon from '@material-ui/icons/PostAdd';



class ShowProducts extends Component {

    constructor(props) {
        super(props)
        // super(props)
        this.state = {
            products: [],
            error: '',
            activePage: 1,
            itemsPerPage: 12,
            totalItems: 0,
            productCategoryList: [],
            sort: 'name',
            success: '',
            showModal: false
        }
        this.saveProduct = this.saveProduct.bind(this);
        this.buttonFormatterSave = this.buttonFormatterSave.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.buttonFormatterRemove = this.buttonFormatterRemove.bind(this)
        this.openAddProduct = this.openAddProduct.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    buttonFormatterSave(cell, row, enumObject, rowIndex) {
        //  console.log( row)
        return (
            <button
                className="btn btn-sm btn-outline-success"
                type="button"
                onClick={() =>
                    this.saveProduct(row)}
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
                    this.deleteProduct(row)}
            >
                <DeleteIcon />
            </button>
        )
    }

    saveProduct(product) {
        ProductService.post(product).then(result => {
            this.setState({
                success: 'Product updated succesfully',
                error: ''
            })
        }
        ).catch(error =>
            this.setState({
                error: error.message,
                success: ''
            }));
    }

    deleteProduct(product) {
        ProductService.deleteProduct(product.productId).then(result => {
            this.setState({ success: 'Product deleted succesfully', error: '' })
            ProductService.get().then(result => {
                this.setState({
                    products: result.results,
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
        ProductService.get({
            params: {
                page: this.state.activePage - 1,
                sort: this.state.sort,
                size: this.state.itemsPerPage
            }
        }).then(result => {
            this.getCategories();
            this.setState({
                products: result.results,
                totalItems: result.totalItems
            });
        }
        ).catch(error =>
            this.setState({ error: error.message, success: '' })
        )
    }

    getCategories = () => {
        CategoryService.get().then(result => {
            this.setState({
                productCategoryList: result
            });
        }
        ).catch(error =>
            this.setState({
                error: error.message,
                success: ''
            })
        )
    }

    getProducts = (pageNumber) => {
        ProductService.get(
            {
                params: {
                    page: pageNumber - 1,
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

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
        this.getProducts(pageNumber);
    }

    openAddProduct() {
        this.setState({ showModal: true });

    }

    closeModal() {
        this.setState({ showModal: false });
        this.getProducts(1);

    }


    render() {
        // const options = this.state.productCategoryList.map(function(row) {
        //     return { value : row.categoryId, label : row.nameCategory }
        //  })

        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true
        })


        const columns = [
            {
                dataField: 'productId',
                text: 'Product ID',
                isKey: true,
                sort: false,
                editable: false
            }, {
                dataField: 'name',
                text: 'Title',
                editor: {
                    type: Type.TEXTAREA
                },
                sort: true,
            }, {
                dataField: 'description',
                text: 'Description',
                style: {
                    'width': '270px',
                    'overflow': 'hidden',
                    'display': '-webkit-box',
                    '-webkit-line-clamp': '3',
                    '-webkit-box-orient': 'vertical',
                    'min-height': '73px'
                },
                editor: {
                    type: Type.TEXTAREA
                },
                sort: false
            }, {
            //     dataField: 'productCategoryList[0].categoryId',
            //     text: 'Category',
            //     editor: {
            //         type: Type.SELECT,
            //         options:options
            //     },
            //     sort: false,
            //     editable: false
            // }, {
                dataField: 'prescripted',
                text: 'Prescripted',
                editor: {
                    type: Type.CHECKBOX,
                    value: 'true:false'
                },
                sort: false,

            }
            , {
                dataField: 'image',
                text: 'Image',
                editor: {
                    type: Type.TEXTAREA
                },
                sort: false,

            }, {
                dataField: 'discount',
                text: 'Discount',
                sort: true,

            }, {
                dataField: 'stock',
                text: 'Stock',
                sort: true,

            }, {
                dataField: 'price',
                text: 'Price',
                sort: true,

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
                <h1 class="mt-4">Products</h1>
                {message}
                <button className="btn btn-sm btn-outline-success"
                    title="Add product"
                    type="button"
                    onClick={() =>
                        this.openAddProduct()}
                ><PostAddIcon /></button>
                <DataTable key="showProductsTable" columns={columns} data={this.state.products} cellEdit={cellEdit} tableKey={'productId'} />
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
                <AddProduct key={"registerModal"} showModal={this.state.showModal} onHide={this.closeModal} title={this.state.modalTitle} categories={this.state.productCategoryList}/>

            </>
        )

    }
}
export default ShowProducts;