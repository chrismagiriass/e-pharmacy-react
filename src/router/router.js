import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomerList from '../components/customers/CustomerList';
// import AddressList from '../components/address/AddressList';
// import CustomerForm from '../components/customers/CustomerForm';
// import MyModal from '../components/basic/MyModal';


const Router = () => {

    return (
        <Switch>
            {/* <Route exact path='/customers/create' component={CustomerForm} /> */}
            <Route exact path='/customers' component={CustomerList} />
            {/* <Route exact path='/register' component={() => } /> */}

        </Switch>
    );
}

export default Router;