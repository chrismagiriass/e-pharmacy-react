import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShowCustomers from '../components/customers/ShowCustomers';
import ShowEmployees from '../components/employees/ShowEmployees';
import HomePage from '../components/basic/HomePage';
import ShowProducts from '../components/products/ShowProducts';
import ProductPage from '../components/products/ProductPage';
import ProductTable from '../components/products/ProductTable';
import IngredientPage from '../components/ingredients/IngredientPage';
import ShowIngredients from '../components/ingredients/ShowIngredients';
import ShowOrder from '../components/order/ShowOrder';
import Cart from '../components/cart/Cart';
import Multistep from '../multistep/multistep';



const Router = () => {


    return (
        <Switch>
 
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/products' component={ShowProducts} />
            <Route exact path='/products/table' component={ProductTable} />
            <Route exact path="/products/:productId" component={ProductPage}  />
            <Route exact path='/ingredients' component={ShowIngredients} />
            <Route exact path="/ingredients/:ingredientId" component={IngredientPage} />
            <Route exact path='/customers' component={ShowCustomers} />
            <Route exact path='/employees' component={ShowEmployees} />
            <Route exact path='/intranet/products' />
            <Route exact path='/intranet/employees' />
            <Route exact path='/order' component={Cart}/>
            <Route render={()=><Redirect to="/"/>} />

        </Switch>
    );
}

export default Router;