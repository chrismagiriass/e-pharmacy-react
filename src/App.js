import React, { Component } from 'react';
import AppBar from "./components/basic/AppBar";
import './App.css';
import ProductBar from './components/basic/ProductBar';

class App extends Component {

  render() {

    return (
      <>
        <AppBar />
        <ProductBar />
      </>
    );
  }
}

export default App;