import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './basic.css';


class ProductBar extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         showEmployees: false,
    //     };
    //     this.openEmployees = this.openEmployees.bind(this);
    // }

    render() {

        return (
            <Navbar expand="sm" className="productBar">

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <NavDropdown title="Products" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/products">Woman</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Men</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Pharmacy</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Ingredients" id="basic-nav-dropdown2">
                            <NavDropdown.Item href="#action/3.1">Type 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Type 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Type 3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="AboutUs" id="basic-nav-dropdown2">
                            <NavDropdown.Item href="/employees" >Employees</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Type 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Type 3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default ProductBar;

