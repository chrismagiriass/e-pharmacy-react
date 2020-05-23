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
import ProfilePage from './components/customers/ProfilePage'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      cart: []
    }
  }

  openLogin = () => {
    this.setState({ showModal: true })
  }

  componentDidMount() {
    let cartItems = localStorage.getItem("cart");
    if (cartItems) {
        this.setState({ cart: JSON.parse(cartItems) })
    }

}

  addToCart = (product) => {
    let cartItems = [];
    let cart = localStorage.getItem("cart");
    if (cart) {
      cartItems = JSON.parse(cart);
    }
    let productExists = cartItems.filter(item => item.productId === product.productId);
    product.quantity = 1;
    if (productExists.length > 0) {
      productExists[0].quantity++;
    } else {
      cartItems.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    this.setState({
      cart: cartItems
    })
  }

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
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/products' render={() => <ShowProducts addToCart={this.addToCart} />} />
            <Route exact path="/products/:productId" render={props => <ProductPage {...props} addToCart={this.addToCart} />} />
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
            <Route exact path='/products' render={() => <ShowProducts addToCart={this.addToCart} />} />
            <Route exact path="/products/:productId" render={props => <ProductPage {...props} addToCart={this.addToCart} />} />
            <Route exact path='/order' component={() => <CheckoutForm openLogin={this.openLogin} />} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>);

      }

    } else {
      router = (<Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/products' render={() => <ShowProducts addToCart={this.addToCart} />} />
        <Route exact path="/products/:productId" render={props => <ProductPage {...props} addToCart={this.addToCart} />} />
        <Route exact path='/order' component={() => <CheckoutForm openLogin={this.openLogin} />} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>);
    }

    return (
      <>
        <BrowserRouter>
          <AppBar userRole={user ? user.role : 'GUEST'} showModal={this.state.openLogin} cartItems={this.state.cart} />
          {!loggedIn || (loggedIn && user.role === 'CUSTOMER') ? <ProductBar /> : ''}
          {router}
          {!loggedIn || (loggedIn && user.role === 'CUSTOMER') ? <Footer /> : ''}
        </BrowserRouter>
      </>
    );
  }
}

export default App;