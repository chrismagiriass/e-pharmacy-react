import React, { Component } from 'react';
import "./simple-sidebar.css";
import PersonIcon from '@material-ui/icons/Person';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import GroupIcon from '@material-ui/icons/Group';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CategoryIcon from '@material-ui/icons/Category';
import { withRouter } from "react-router-dom";

class HomePageAdmin extends Component {


    render() {

        let user = JSON.parse(localStorage.getItem('user'));
        return (
      


                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading">Hello {user.fullName} </div>
                    <div className="list-group list-group-flush">
                        <a href="#"  onClick={() => this.props.history.push("/orders")} className="list-group-item list-group-item-action bg-light"><LocalShippingIcon/> Orders  <span class="badge badge-danger">!</span></a>
                        <a href="#" onClick={() => this.props.history.push("/employees")}  className="list-group-item list-group-item-action bg-light"><GroupIcon/> Employees</a>
                        <a href="#" onClick={() => this.props.history.push("/customers")}  className="list-group-item list-group-item-action bg-light"><SupervisedUserCircleIcon/> Customers</a>
                        <a href="#"  className="list-group-item list-group-item-action bg-light"><LocalHospitalIcon/> VIP Customers <span class="badge badge-success">BETA</span></a>
                        <a href="#" onClick={() => this.props.history.push("/products")}  className="list-group-item list-group-item-action bg-light"><ListAltIcon/> Products</a>
                        <a href="#" onClick={() => this.props.history.push("/ingredients")}  className="list-group-item list-group-item-action bg-light"><LocalPharmacyIcon/> Ingredients</a>
                        <a href="#" onClick={() => this.props.history.push("/categories")}  className="list-group-item list-group-item-action bg-light"><CategoryIcon/> Categories</a>

                    </div>
                </div>

        );
    }
}

export default withRouter(HomePageAdmin);