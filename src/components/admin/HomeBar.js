import React, { Component } from 'react';
import "./simple-sidebar.css";
import PersonIcon from '@material-ui/icons/Person';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import GroupIcon from '@material-ui/icons/Group';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import ListAltIcon from '@material-ui/icons/ListAlt';

class HomePageAdmin extends Component {


    render() {

        let user = JSON.parse(localStorage.getItem('user'));
        return (
      


                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Hello {user.fullName} </div>
                    <div class="list-group list-group-flush">
                        <a href="#" class="list-group-item list-group-item-action bg-light"><PersonIcon/><i class="pe-7s-user"></i> Profile</a>
                        <a href="/orders" class="list-group-item list-group-item-action bg-light"><LocalShippingIcon/> Orders</a>
                        <a href="/employees" class="list-group-item list-group-item-action bg-light"><GroupIcon/> Employees</a>
                        <a href="/customers" class="list-group-item list-group-item-action bg-light"><SupervisedUserCircleIcon/> Customers</a>
                        <a href="#" class="list-group-item list-group-item-action bg-light"><LocalHospitalIcon/> VIP Customers</a>
                        <a href="/products" class="list-group-item list-group-item-action bg-light"><ListAltIcon/> Products</a>
                        <a href="/ingredients" class="list-group-item list-group-item-action bg-light"><LocalPharmacyIcon/> Ingredients</a>

                    </div>
                </div>

        );
    }
}

export default HomePageAdmin;