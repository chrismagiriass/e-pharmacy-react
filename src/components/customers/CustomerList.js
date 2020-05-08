import React, { Component } from "react";
// import {getCustomers} from "../../actions/customerActions";
import CustomerService from "../../services/customerService";
import DataTable from "../basic/DataTable";

const columns = [
    {
      dataField: 'personId',
      text: 'Customer ID',
      sort: true
    },
    {
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
      },
      {
        dataField: 'address.city',
        text: 'City',
        sort: true
      }
  ]


class CustomerList extends Component {

    constructor(props) {
        super(props)
        // super(props)
        this.state = { customers: [] }

    }
    componentWillMount() {
        CustomerService.get().then(result => {
            this.setState({ customers: result });
        }
        ).catch(error =>
            console.error("Error from customer", error)
        )
    }
    render() {
        console.log(this.state.customers);
        return (
            <DataTable columns={columns} data={this.state.customers} />
        )

    }
}
export default CustomerList;