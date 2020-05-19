import React, { Component } from "react";
import EmployeeService from "../../services/employeeService";
import EmployeeTable from "./EmployeeTable";



class ShowEmployeesNew extends Component {

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
            <div className="container">
                <EmployeeTable key="showEmployeesTable" data={this.state.employees} />
            </div>
        )

    }
}
export default ShowEmployeesNew;