import React, { Component } from "react";
import CustomerService from "../../services/customerService";
import DataTable from "../basic/DataTable";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import cellEditFactory from 'react-bootstrap-table2-editor';




class ShowCustomers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      error: '',
      success: ''
    }
    this.saveCustomer = this.saveCustomer.bind(this);
    this.buttonFormatterSave = this.buttonFormatterSave.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.buttonFormatterRemove = this.buttonFormatterRemove.bind(this)

  }



  buttonFormatterSave(cell, row, enumObject, rowIndex) {
    //  console.log( row)
    return (
      <button
        className="btn btn-sm btn-outline-success"
        type="button"
        onClick={() =>
          this.saveCustomer(row)}
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
          this.deleteCustomer(row)}
      >
        <DeleteIcon />
      </button>
    )
  }



  saveCustomer(customer) {
    CustomerService.post(customer).then(result => {
      this.setState({
        success: 'Customer updated succesfully',
        error: ''
      })
    }
    ).catch(error =>
      this.setState({
        error: error.message,
        success: ''
      }));
  }

  deleteCustomer(customer) {
    CustomerService.deleteCustomer(customer.personId).then(result => {
      this.setState({ success: 'Customer deleted succesfully', error: '' })
      CustomerService.get().then(result => {
        this.setState({ customers: result });
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
    CustomerService.get().then(result => {
      this.setState({ customers: result });
    }
    ).catch(error =>
      this.setState({ error: error.message, success: '' })
    )
  }

  render() {
    let message = '';

    const columns = [
      {
        dataField: 'personId',
        text: 'Customer ID',
        isKey: true,
        sort: true,
        editable: false
      }, {
        dataField: 'firstName',
        text: 'First Name',
        sort: true,
      }, {
        dataField: 'lastName',
        text: 'Last Name',
        sort: true
      }, {
        dataField: 'email',
        text: 'E-mail',
        sort: true
      }, {
        dataField: 'afm',
        text: 'Tax Number',
        sort: true
      }, {
        dataField: 'address.city',
        text: 'City',
        sort: true
      },
      {
        formatter: this.buttonFormatterSave,
        editable: false,
        text: ""
      },
      {
        formatter: this.buttonFormatterRemove,
        editable: false,
        text: ""
      }
    ]


    const cellEdit = cellEditFactory({
      mode: 'click',
      blurToSave: true
    })

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
        <DataTable key="showCustomersTable" columns={columns} cellEdit={cellEdit} data={this.state.customers} tableKey={'personId'} />
      </>
    )

  }
}
export default ShowCustomers;