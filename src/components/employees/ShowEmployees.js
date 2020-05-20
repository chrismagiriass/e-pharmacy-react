import React, { Component } from "react";
import EmployeeService from "../../services/employeeService";
import DataTable from "../basic/DataTable";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ShowEmployees extends Component {

  constructor(props) {
    super(props)
    // super(props)
    this.state = {
      employees: [],
      error: '',
      success: ''
    }
    this.saveEmployee = this.saveEmployee.bind(this);
    this.buttonFormatterSave = this.buttonFormatterSave.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.buttonFormatterRemove=this.buttonFormatterRemove.bind(this)

  }

  buttonFormatterSave(cell, row, enumObject, rowIndex) {
    //  console.log( row)
    return (
      <button
        className="btn btn-sm btn-outline-success"
        type="button"
        onClick={() =>
          this.saveEmployee(row)}
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
          this.deleteEmployee(row)}
      >
        <DeleteIcon />
      </button>
    )
  }



  saveEmployee(employee) {
    EmployeeService.post(employee).then(result => {
      this.setState({ success: 'Employee updated succesfully',
      error: '' })
    }
    ).catch(error =>
      this.setState({ error: error.message,
        success:'' }));
  }

  deleteEmployee(employee) {
    EmployeeService.deleteEmployee(employee.personId).then(result => {
      this.setState({ success: 'Employee deleted succesfully',error: '' })
      EmployeeService.get().then(result => {
        this.setState({ employees: result });
      }
      ).catch(error =>
        this.setState({ error: error.message,
          success:''  })
      )
    }
    ).catch(error =>
      this.setState({ error: error.message  }));
    
  }

  componentDidMount() {
    EmployeeService.get().then(result => {
      this.setState({ employees: result });
    }
    ).catch(error =>
      this.setState({ error: error.message ,success:'' })
    )
  }
  render() {

    const cellEdit = cellEditFactory({
      mode: 'click',
      blurToSave: true
    })


    const columns = [
      {
        dataField: 'personId',
        text: 'Employee ID',
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
        dataField: 'role',
        text: 'Role',
        sort: true,

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
      <div id="page-content-wrapper">
        <h1 class="mt-4">Employees</h1>
        {message}
        <DataTable key="showEmployeesTable" columns={columns} data={this.state.employees} cellEdit={cellEdit} tableKey={'personId'} pagination={paginationFactory()}/>
      </div>
    )

  }
}
export default ShowEmployees;