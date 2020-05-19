import React, { Component } from 'react';
import BootstrapTable  from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


class DataTable extends Component {

    render() {

        return (
            <div className="container">
                <BootstrapTable
                    striped
                    hover
                    keyField={this.props.tableKey}
                    data={this.props.data}
                    columns={this.props.columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()} 
                    cellEdit={  this.props.cellEdit}
                    />
            </div>
        );
    }
}

export default DataTable;