import React, { Component } from "react";
import "./customerForm.css";
import { Form, Col, InputGroup } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import LoginService from "../../services/loginService";
import AlertMessage from "../basic/AlertMessage";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            user: {
                password: '',
                username: ''
            },
            message:'',
            show:false
        }
       

    }
    changeHandler=(event)=> {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            }
        })
    }

    handleSubmit=(event) =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            LoginService.login(this.state.user)
                .then(resp => {
                    localStorage.setItem("user", JSON.stringify(resp.data))
                    window.location.reload();
                })
                .catch(err => this.setState({message:err.message==='Request failed with status code 401'?'Wrong credentials.':'Something went wrong.',show:true}));
        }
    }


    render() {

        return (
            <div className="container">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                        {this.state.show ?<AlertMessage show={true} message={this.state.message} key={'login-error'} variant={'danger'}/>:''}

                        <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                            <Form.Label>E-mail</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    name="username"
                                    value={this.state.user.username}
                                    onChange={this.changeHandler}
                                />
                                <Form.Control.Feedback type="invalid">
                                    E-mail is required.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustomPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={this.state.user.password}
                                    onChange={this.changeHandler}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password is required.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <button type="submit" className="btn btn-submit float-right">Login</button>
                </Form>
            </div>
        );
    }

}

export default withRouter(LoginForm);