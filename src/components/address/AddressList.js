import React, { Component } from "react";
import AddressService from "../../services/addressService";
import DataTable from "../basic/DataTable";

const columns = [
    {
        dataField: 'addressId',
        text: 'Address ID',
        sort: true
    },
    {
        dataField: 'city',
        text: 'City',
        sort: true,
    }, {
        dataField: 'streetName',
        text: 'Street Name',
        sort: true
    }, {
        dataField: 'streetNumber',
        text: 'Street Number',
        sort: true
    }, {
        dataField: 'region',
        text: 'Region',
        sort: true
    }, {
        dataField: 'zipCode',
        text: 'Zip code',
        sort: true
    }
]


class AddressList extends Component {



    constructor(props) {
        super(props)
        // super(props)
        this.state = { address: [] }

    }
    componentWillMount() {
        AddressService.get().then(result => {
            this.setState({ address: result });
        }
        ).catch(error =>
            console.error("Error from address", error)
        )
    }
    render() {
        console.log('asdasd');
        console.log(this.state.address);
        return (
            <DataTable columns={columns} data={this.state.address} />
        )

    }
}
export default AddressList;