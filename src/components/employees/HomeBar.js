import React, { Component } from 'react';
import "./simple-sidebar.css";

class HomePageAdmin extends Component {


    render() {

        let user = JSON.parse(localStorage.getItem('user'));
        return (
      


                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Hello {user.fullName} </div>
                    <div class="list-group list-group-flush">
                        <a href="#" class="list-group-item list-group-item-action bg-light"><i class="pe-7s-user"></i>Profile</a>
                        <a href="/orders" class="list-group-item list-group-item-action bg-light">Orders</a>
                        <a href="/customers" class="list-group-item list-group-item-action bg-light">Customers</a>
                        <a href="#" class="list-group-item list-group-item-action bg-light">VIP Customers</a>
                        <a href="/products" class="list-group-item list-group-item-action bg-light">Products</a>
                        <a href="/ingredients" class="list-group-item list-group-item-action bg-light">Ingredients</a>

                    </div>
                </div>

        );
    }
}

export default HomePageAdmin;