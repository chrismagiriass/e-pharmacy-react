import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class DataTable extends Component {



    render() {

        const { columns } = this.props;
        const { data } = this.props;

        return (
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={data}
                    columns={columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()}
                />
            </div>
        );
    }
}

export default DataTable;