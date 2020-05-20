import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, InputGroup } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import SearchIcon from '@material-ui/icons/Search';
import MyModal from './MyModal';
import { withRouter } from "react-router-dom";



class AppBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalTitle: '',
            register: true,
            cart: []
        };
        this.openRegisterModal = this.openRegisterModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openLoginModal = this.openLoginModal.bind(this);
    }

    componentDidMount() {
        let cartItems = localStorage.getItem("cart");
        if (cartItems) {
            this.setState({ cart: JSON.parse(cartItems) })
        }

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

    logout = () => {
        localStorage.clear();
        window.location.reload();
    }


    render() {

        let acountSettings = '';

        if (!localStorage.getItem("user")) {
            acountSettings = <> <NavDropdown.Item onClick={this.openRegisterModal}>Register</NavDropdown.Item>
                <NavDropdown.Item onClick={this.openLoginModal}>Login</NavDropdown.Item></>;
        } else {
            acountSettings = <> <NavDropdown.Item onClick={this.openRegisterModal}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item></>;
        }

        return (
            <>
                <Navbar expand="xl" sticky={true} className="appbar">
                    <Navbar.Brand href="/home"><img
                        src="/favicon.ico"
                        width="60"
                        height="60"
                        className="d-inline-block align-center"
                        alt="Pharmacy4all logo"
                    />pharmacy<span className="brand-number">4</span>all</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            {(this.props.userRole !== 'ADMIN' && this.props.userRole !== 'EMPLOYEE') ?
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
                                : ''}
                        </Nav>
                        <NavDropdown title={<div style={{ display: "inline-block" }}><AccountCircle /> </div>} id="basic-nav-dropdown">
                            {acountSettings}
                        </NavDropdown>
                        {(this.props.userRole !== 'ADMIN' && this.props.userRole !== 'EMPLOYEE') ?
                            <NavDropdown title={<div style={{ display: "inline-block" }}><ShoppingCartRoundedIcon /> <sup className="cirlce">{this.state.cart.length}</sup> </div>} id="basic-nav-dropdown">
                                {this.state.cart.map((item) => {
                                    return <NavDropdown.Item >{item.name}</NavDropdown.Item>
                                })}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/order"><button className="btn btn-submit">Checkout</button></NavDropdown.Item>
                            </NavDropdown> : ''}
                    </Navbar.Collapse>
                </Navbar>
                <MyModal key={"registerModal"} showModal={this.state.showModal} onHide={this.closeModal} title={this.state.modalTitle} register={this.state.register} />
            </>
        );
    }
}

export default withRouter(AppBar);

