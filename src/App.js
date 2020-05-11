import React, { Component } from 'react';
import AppBar from "./components/basic/AppBar";
import './App.css';
import ProductBar from './components/basic/ProductBar';
import HomePage from './components/basic/HomePage';
import Footer from './components/basic/Footer';

class App extends Component {

  render() {

    return (
      <div>
        <AppBar />
        <div>
          <ProductBar />
        </div>
      </div>
      // <HomePage/>
    );
  }
}

export default App;