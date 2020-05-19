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
import HomePage from './components/basic/HomePage';
import ShowProducts from './components/products/ShowProducts';
import ProductPage from './components/products/ProductPage';
import ProductTable from './components/products/ProductTable';
import IngredientPage from './components/ingredients/IngredientPage';
import ShowIngredients from './components/ingredients/ShowIngredients';
import Cart from './components/cart/Cart';
import HomePageAdmin from './components/admin/HomePage'


class App extends Component {

  render() {
    let router;
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      switch (user.role) {
        case 'ADMIN':
          router = (<Switch>
            <Route exact path='/' component={HomePageAdmin} />
            <Route exact path='/home' component={HomePageAdmin} />
            <Route exact path='/products' component={ProductTable} />
            <Route exact path='/ingredients' component={ShowIngredients} />
            <Route exact path='/customers' component={ShowCustomers} />
            <Route exact path='/employees' component={ShowEmployees} />
            <Route exact path='/orders' component={Cart} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>);
          break;
        case 'EMPLOYEE':
          router = <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/products' component={ProductTable} />
            <Route exact path='/ingredients' component={ShowIngredients} />
            <Route exact path='/customers' component={ShowCustomers} />
            <Route exact path='/orders' component={Cart} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>;
          break;
        case 'CUSTOMER':
          router = (<Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/products' component={ShowProducts} />
            <Route exact path="/products/:productId" component={ProductPage} />
            <Route exact path='/order' component={Cart} />
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
          <AppBar />
          <ProductBar />
          {router}
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;