import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, InputGroup } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import SearchIcon from '@material-ui/icons/Search';
import MyModal from './MyModal';
import { withRouter } from "react-router-dom";
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';


class AppBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalTitle: '',
            register: true
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
            acountSettings = <> <NavDropdown.Item onClick={() => this.props.history.push("/profile")}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item></>;
        }

        return (
            <>
                <Navbar expand="xl" sticky={true} className="appbar">
                    <Navbar.Brand  href="#" onClick={() => this.props.history.push("/home")}><img
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
                                <h5 style={{'opacity':'0.8'}}><HeadsetMicIcon /> Customer support: + 30 210 1234567</h5>
                                : ''}
                        </Nav>
                        <NavDropdown title={<div style={{ display: "inline-block" }}><AccountCircle /> </div>} id="basic-nav-dropdown">
                            {acountSettings}
                        </NavDropdown>
                        {(this.props.userRole !== 'ADMIN' && this.props.userRole !== 'EMPLOYEE') ?
                            <NavDropdown drop='left' title={<div style={{ display: "inline-block" }}><ShoppingCartRoundedIcon />
                                <sup className="cirlce">{this.props.cartItems.length}</sup> </div>} id="basic-nav-dropdown">
                                {this.props.cartItems.length ? this.props.cartItems.map((item) => {
                                    return <NavDropdown.Item disabled >{item.name}</NavDropdown.Item>
                                }) : ''}
                                <NavDropdown.Divider />
                                {this.props.cartItems.length ? <NavDropdown.Item onClick={() => this.props.history.push("/order")}><button className="btn btn-submit">Checkout</button></NavDropdown.Item> :
                                    <NavDropdown.Item disabled ><button className="btn btn-submit">Checkout</button></NavDropdown.Item>}
                            </NavDropdown> : ''}
                    </Navbar.Collapse>
                </Navbar>
                <MyModal key={"registerModal"} showModal={this.state.showModal} onHide={this.closeModal} title={this.state.modalTitle} register={this.state.register} />
            </>
        );
    }
}

export default withRouter(AppBar);

