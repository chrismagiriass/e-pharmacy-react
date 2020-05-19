import React, { Component } from "react";
import ProductService from '../../services/productService';
import DataTable from "../basic/DataTable";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';


class ShowProducts extends Component {

    constructor(props) {
        super(props)
        // super(props)
        this.state = {
            products: [],
            error: '',
            success: ''
        }
        this.saveProduct = this.saveProduct.bind(this);
        this.buttonFormatterSave = this.buttonFormatterSave.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.buttonFormatterRemove = this.buttonFormatterRemove.bind(this)

    }

    buttonFormatterSave(cell, row, enumObject, rowIndex) {
        //  console.log( row)
        return (
            <button
                className="btn btn-sm btn-success"
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
                className="btn btn-sm btn-danger"
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
        ProductService.deleteProduct(product.personId).then(result => {
            this.setState({ success: 'Product deleted succesfully', error: '' })
            ProductService.get().then(result => {
                this.setState({ products: result });
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
        ProductService.get().then(result => {
            this.setState({ products: result.results });
        }
        ).catch(error =>
            this.setState({ error: error.message, success: '' })
        )
    }
    render() {

        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true
        })


        const columns = [
            {
                dataField: 'productId',
                text: 'Product ID',
                isKey: true,
                sort: true,
                editable: false
            }, {
                dataField: 'name',
                text: 'Title',
                sort: true,
            }, {
                dataField: 'description',
                text: 'Description',
                sort: true
            }, {
                dataField: 'type',
                text: 'Type',
                sort: true
            }, {
                dataField: 'prescripted',
                text: 'Prescripted',
                sort: true,

            }
            , {
                dataField: 'image',
                text: 'Image',
                sort: true,

            }, {
                dataField: 'discount',
                text: 'Discount',
                sort: true,

            },{
                dataField: 'stock',
                text: 'Stock',
                sort: true,

            },{
                dataField: 'price',
                text: 'Price',
                sort: true,

            },{
                formatter: this.buttonFormatterSave,
                editable: false,
                text: ""
            },{
                formatter: this.buttonFormatterSave,
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
                {message}
                <DataTable key="showProductsTable" columns={columns} data={this.state.products} cellEdit={cellEdit} tableKey={'productId'} />
            </>
        )

    }
}
export default ShowProducts;