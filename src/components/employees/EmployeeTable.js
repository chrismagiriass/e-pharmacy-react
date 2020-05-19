import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table-plus';


import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


class EmployeeTable extends Component {


    render() {

        return (
            <BootstrapTable data={this.props.data} striped={true} hover={true} editRow={true} addRow={true} >
                <TableHeaderColumn editColumn={true} dataField="personId" isKey={true} dataAlign="center" dataSort={true}>Employee ID</TableHeaderColumn>
                <TableHeaderColumn dataField="firstName" dataSort={true}>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField="lastName" dataSort={true}>Last Name</TableHeaderColumn>
                <TableHeaderColumn dataField="email" dataSort={true}>E-mail</TableHeaderColumn>
                <TableHeaderColumn dataField="role" dataSort={true}>Role</TableHeaderColumn>
                <TableHeaderColumn dataField="" dataSort={false}>Actions</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default EmployeeTable;