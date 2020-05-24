import React, { Component } from "react";
import OrderService from "../../services/orderService";
import DataTable from "../basic/DataTable";
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/Info';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';



class ShowOrders extends Component {

    constructor(props) {
        super(props)
        // super(props)
        this.state = {
            orders: [],
            error: '',
            success: ''
        }

    }

    dateFormatter = (cell, row, enumObject, rowIndex) => {

        return moment(new Date(row.orderDate)).format("DD-MM-YYYY HH:mm");

    }

    buttonFormatter = (cell, row, enumObject, rowIndex) => {
        let confirm = <button
            className="btn btn-sm btn-outline-success"
            type="button" title="Confirm"
            onClick={() =>
                this.changeStatus(row, "CONFIRMED")}
        >
            <DoneIcon />
        </button>;

        let reject = <button
            className="btn btn-sm btn-outline-danger"
            type="button" title="Reject"
            onClick={() =>
                this.changeStatus(row, 'REJECTED')}
        >
            <ClearIcon />
        </button>

        let shipped = <button
            className="btn btn-sm btn-outline-primary"
            type="button" title="Ship Order"
            onClick={() =>
                this.changeStatus(row, 'SHIPPED')}>
            <LocalShippingIcon />
        </button>

        let delivered = <button
            className="btn btn-sm btn-outline-secondary"
            type="button" title="Delivered"
            onClick={() =>
                this.changeStatus(row, 'DELIVERED')}>
            <DoneAllIcon />
        </button>

        switch (row.status) {
            case 'PENDING':
                return <div class="btn-group" role="group" aria-label="Basic example">
                    {confirm}
                    {reject}
                </div>
            case 'CONFIRMED':
                return <div class="btn-group" role="group" aria-label="Basic example">
                    {shipped}
                    {reject}

                </div>
            case 'SHIPPED':
                return <>{delivered}</>
            default:
                return '';

        }

    }

    customerInfo = (cell, row, enumObject, rowIndex) => {

        return (
            <>
                {row.customerId}
                <OverlayTrigger
                    key={'customerInfo'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip-customerInfo`}>
                            {row.customerInfo}
                        </Tooltip>
                    }
                >
                    <InfoIcon style={{ 'margin-left': '10px' }} />
                </OverlayTrigger>{' '}
            </>
        )
    }




    changeStatus = (order, status) => {
        order.status = status;
        OrderService.post(order).then(result => {
            // this.setState({ success: 'Order status updated.', error: '' })
            OrderService.get().then(result => {
                this.setState({
                    orders: result,
                    success: 'Order status updated.', error: ''
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
        OrderService.get().then(result => {
            this.setState({ orders: result });
        }
        ).catch(error =>
            this.setState({ error: error.message, success: '' })
        )
    }
    render() {

        const columns = [
            {
                dataField: 'orderId',
                text: 'Order No.',
                isKey: true,
                sort: true
            }, {
                dataField: 'orderDate',
                text: 'Order date',
                formatter: this.dateFormatter,
                sort: true,
            }, {
                dataField: 'prescriptionZipcode',
                text: 'Presc. code',
                sort: true
            }, {
                dataField: 'status',
                text: 'Status',
                sort: true
            }, {
                dataField: 'payment',
                text: 'Payment',
                sort: true
            }, {
                dataField: 'customerId',
                text: 'Cust. id',
                align: 'center',
                formatter: this.customerInfo,
                sort: true
            }, {
                formatter: this.buttonFormatter,
                editable: false,
                text: "Status"
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
                <h1 class="mt-4">Orders</h1>
                {message}
                <DataTable key="showOrdersTable" columns={columns} data={this.state.orders} tableKey={'orderId'} pagination={paginationFactory()} />
            </div>
        )

    }
}
export default ShowOrders;