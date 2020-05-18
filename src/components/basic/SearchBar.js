import { Nav } from 'react-bootstrap';
import React, { Component } from 'react';
export default class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
        this.updateModal = this.updateModal.bind(this);
    }

    updateModal(isVisible) {
        this.state.isVisible = isVisible;
        this.forceUpdate();
    }

    render() {
        return (
            <>

                <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                    activeKey="/home"
                    onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
                    <div className="sidebar-sticky"></div>
                    <Nav.Item>
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                    </Nav.Link>
                    </Nav.Item>
                </Nav>

            </>
        );
    }
}