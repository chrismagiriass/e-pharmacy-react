import React, { Component } from 'react';
import BootstrapTable  from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class DataTable extends Component {

    render() {

        return (
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    // remote={{
                    //     filter: true,
                    //     pagination: false,
                    //     sort: false,
                    //     cellEdit: false
                    // }}
                    striped
                    hover
                    keyField='id'
                    data={this.props.data}
                    columns={this.props.columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()} />
            </div>
        );
    }
}

export default DataTable;