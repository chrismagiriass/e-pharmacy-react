import React, { Component } from 'react';
import AppBar from "./components/basic/AppBar";
import './App.css';
import ProductBar from './components/basic/ProductBar';
import { BrowserRouter } from "react-router-dom";
import Router from './router/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/basic/Footer';

class App extends Component {
  
  render() {

    return (
      <>

        <BrowserRouter>
          <AppBar />
          <ProductBar />
          <Router />
          <Footer />
        </BrowserRouter>

      </>
    );
  }
}

export default App;