import React, { Component } from "react";
import EmployeeService from "../../services/employeeService";
import DataTable from "../basic/DataTable";

const columns = [
  {
    dataField: 'personId',
    text: 'Employee ID',
    sort: true
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
    sort: true
  }
]


class ShowEmployees extends Component {

  constructor(props) {
    super(props)
    // super(props)
    this.state = { employees: [] }

  }
  componentDidMount() {
    EmployeeService.get().then(result => {
      this.setState({ employees: result });
    }
    ).catch(error =>
      console.error("Error from employee", error)
    )
  }
  render() {
    console.log(this.state.employees);
    return (
      <DataTable key="showEmployeesTable" columns={columns} data={this.state.employees} />
    )

  }
}
export default ShowEmployees;