import React, { Component } from 'react';
import AppBar from "./components/basic/AppBar";
import './App.css';
import ProductBar from './components/basic/ProductBar';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/basic/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShowCustomers from './components/customers/ShowCustomers';
import ShowEmployees from './components/employees/ShowEmployees';
import HomeBarEmpl from './components/employees/HomeBar';
import HomePageEmpl from './components/employees/HomePage';
import HomePage from './components/basic/HomePage';
import ShowProducts from './components/products/ShowProducts';
import ProductPage from './components/products/ProductPage';
import ProductTable from './components/products/ProductTable';
import IngredientPage from './components/ingredients/IngredientPage';
import ShowIngredients from './components/ingredients/ShowIngredients';
import Cart from './components/cart/Cart';
import HomePageAdmin from './components/admin/HomePage'
import HomeBar from './components/admin/HomeBar';
import ShowOrders from './components/order/ShowOrder';
import CheckoutForm from './components/cart/Wizard';


class App extends Component {




  render() {
    let router;
    let loggedIn = false;
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      loggedIn = true;
      switch (user.role) {
        case 'ADMIN':
          router = (
            <div class="d-flex" id="wrapper">
              <HomeBar />
              <div id="page-content-wrapper">
                <div class="container-fluid">
                  <Switch>
                    <Route exact path='/' component={HomePageAdmin} />
                    <Route exact path='/home' component={HomePageAdmin} />
                    <Route exact path='/products' component={ProductTable} />
                    <Route exact path='/ingredients' component={ShowIngredients} />
                    <Route exact path='/customers' component={ShowCustomers} />
                    <Route exact path='/employees' component={ShowEmployees} />
                    <Route exact path='/orders' component={ShowOrders} />
                    <Route render={() => <Redirect to="/" />} />
                  </Switch>
                </div>
              </div>
            </div>);
          break;
        case 'EMPLOYEE':
          router = (
            <div class="d-flex" id="wrapper">
              <HomeBarEmpl />
              <div id="page-content-wrapper">
                <div class="container-fluid"><Switch>
                  <Route exact path='/' component={HomePageEmpl} />
                  <Route exact path='/home' component={HomePageEmpl} />
                  <Route exact path='/products' component={ProductTable} />
                  <Route exact path='/ingredients' component={ShowIngredients} />
                  <Route exact path='/customers' component={ShowCustomers} />
                  <Route exact path='/orders' component={Cart} />
                  <Route render={() => <Redirect to="/" />} />
                </Switch>
                </div>
              </div>
            </div>);
          break;
        case 'CUSTOMER':
          router = (<Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/products' component={ShowProducts} />
            <Route exact path="/products/:productId" component={ProductPage} />
            <Route exact path='/order' component={() => <CheckoutForm />} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>);
          break;
        case 'VIP':
          router = (<Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/products' component={ProductTable} />
            <Route exact path="/products/:productId" component={ProductPage} />
            <Route exact path='/ingredients' component={ShowIngredients} />
            <Route exact path="/ingredients/:ingredientId" component={IngredientPage} />
            <Route exact path='/orders' component={Cart} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>);
          break;
        default:
          router = (<Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/products' component={ShowProducts} />
            <Route exact path="/products/:productId" component={ProductPage} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>);

      }

    } else {
      router = (<Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/products' component={ShowProducts} />
        <Route exact path="/products/:productId" component={ProductPage} />
        <Route exact path='/order' component={Cart} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>);
    }

    return (
      <>
        <BrowserRouter>
          <AppBar userRole={user ? user.role : 'GUEST'} />
          {!loggedIn || (loggedIn && user.role === 'CUSTOMER') ? <ProductBar /> : ''}
          {router}
          {!loggedIn || (loggedIn && user.role === 'CUSTOMER') ? <Footer /> : ''}
        </BrowserRouter>
      </>
    );
  }
}

export default App;