import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router-dom";



class ProductBar extends Component {

    render() {

        return (
            <Navbar expand="sm" className="productBar">

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => this.props.history.push("/home")}>Home</Nav.Link>
                        <Nav.Link onClick={() => this.props.history.push("/products")}>Products</Nav.Link>
                        <Nav.Link onClick={() => this.props.history.push("/ingredients")}>Ingredients <span class="badge badge-success">BETA</span></Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(ProductBar);

