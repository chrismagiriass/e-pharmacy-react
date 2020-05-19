import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, InputGroup } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import SearchIcon from '@material-ui/icons/Search';
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
                <Navbar expand="xl" sticky={true} className="appbar">
                    <Navbar.Brand href="#home"><img
                        src="/favicon.ico"
                        width="60"
                        height="60"
                        className="d-inline-block align-center"
                        alt="Pharmacy4all logo"
                    />pharmacy<span className="brand-number">4</span>all</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Form >
                                <InputGroup className="mr-md-5 mr-sm-2 mr-xl-5">
                                    <Form.Control
                                        className="py-2 border-right-0 border"
                                        type="text"
                                        placeholder="Search" />
                                    <span className="input-group-append">
                                        <button className="btn btn-outline-secondary border-left-0 border"><SearchIcon /></button>
                                    </span>
                                </InputGroup>
                            </Form>
                        </Nav>

                        <NavDropdown title={<div style={{ display: "inline-block" }}><AccountCircle /> </div>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.openRegisterModal}>Register</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.openLoginModal}>Login</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<div style={{ display: "inline-block" }}><ShoppingCartRoundedIcon /> <sup className="cirlce">{this.state.cart.items}</sup> </div>} id="basic-nav-dropdown">
                            <NavDropdown.Item >Cart item 1</NavDropdown.Item>
                            <NavDropdown.Item >Cart item 2</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4"><button className="btn btn-submit">Checkout</button></NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
                <MyModal key={"registerModal"} showModal={this.state.showModal} onHide={this.closeModal} title={this.state.modalTitle} register={this.state.register} />
            </>
        );
    }
}

export default AppBar;

