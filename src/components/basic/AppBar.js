import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './basic.css';
import MyModal from './MyModal';


class AppBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalTitle: '',
            register: true,
            cart: {
                items: 4
            }
        };
        this.openRegisterModal = this.openRegisterModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openLoginModal = this.openLoginModal.bind(this);
    }

    openRegisterModal() {
        this.setState({ showModal: true, register: true, modalTitle: 'Register' });

    }
    openLoginModal() {
        this.setState({ showModal: true, register: false, modalTitle: 'Login' });

    }
    closeModal() {
        this.setState({ showModal: false });

    }


    render() {

        return (
            <>
                <Navbar bg="light" expand="xl" className="menuBar">
                    <Navbar.Brand href="#home"><img
                        src="/favicon.ico"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Pharmacy4all logo"
                    />pharmacy4all</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>

                        <NavDropdown title={<div style={{ display: "inline-block" }}><ShoppingCartIcon /> Cart {this.state.cart.items} </div>} id="basic-nav-dropdown">
                            <NavDropdown.Item >Cart item 1</NavDropdown.Item>
                            <NavDropdown.Item >Cart item 2</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title={<div style={{ display: "inline-block" }}><AccountCircle /> Account </div>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.openRegisterModal}>Register</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.openLoginModal}>Login</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
                <MyModal key={"registerModal"} showModal={this.state.showModal} onHide={this.closeModal} title={this.state.modalTitle} register={this.state.register} />
            </>
        );
    }
}

export default AppBar;

