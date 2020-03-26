import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import axios from './axios';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';

class App extends Component {
  state = {
    products: [],
    categories: [],
    languages: [],
    paymentTypes: [],
    cartItems: []
  };

  componentDidMount() {
    axios.get('http://localhost:3000/products').then(data => {
      data && this.setState({ products: data });
    });
    axios.get('http://localhost:3000/categories').then(data => {
      data && this.setState({ categories: data });
    });
    axios.get('http://localhost:3000/languages').then(data => {
      data && this.setState({ languages: data });
    });
    axios.get('http://localhost:3000/paymentTypes').then(data => {
      data && this.setState({ paymentTypes: data });
    });
  }

  addToCartHandler = (product, quantity = 1) => {
    const cartItems = [...this.state.cartItems];
    let index = cartItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      cartItems[index] = { ...cartItems[index] };
      cartItems[index].count += quantity;
    } else {
      cartItems.push({ product: { ...product }, count: quantity });
    }
    this.setState({ cartItems });
  };

  removeItemHandler = item => {
    const cartItems = this.state.cartItems.filter(
      cartItem => item.product.id !== cartItem.product.id
    );
    this.setState({ cartItems });
  };

  addProductHandler = product => {
    const products = [...this.state.products];
    products.push(product);
    console.log(products);
    this.setState({ products });
  };

  editProductHandler = product => {
    const products = [...this.state.products];
    const index = products.findIndex(p => p.id === product.id);
    products[index] = product;
    this.setState({ products });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          cartItems={this.state.cartItems}
          onItemRemove={this.removeItemHandler}
        ></Navbar>
        <div className='container'>
          <Switch>
            <Route path='/about' component={About}></Route>
            <Route path='/contact' component={Contact}></Route>
            <Route
              path='/products'
              render={props => (
                <ProductList
                  {...props}
                  products={this.state.products}
                  categories={this.state.categories}
                  onAddToCart={this.addToCartHandler}
                ></ProductList>
              )}
            ></Route>
            <Route
              path='/product/:id'
              render={props => (
                <ProductForm
                  {...props}
                  paymentTypes={this.state.paymentTypes}
                  languages={this.state.languages}
                  categories={this.state.categories}
                  onAddProduct={this.addProductHandler}
                  onEditProduct={this.editProductHandler}
                ></ProductForm>
              )}
            ></Route>
            <Route
              path='/product-details/:id'
              render={props => (
                <ProductDetails
                  {...props}
                  products={this.state.products}
                  categories={this.state.categories}
                  onAddToCart={this.addToCartHandler}
                ></ProductDetails>
              )}
            ></Route>
            <Redirect from='/' to='/products' />
          </Switch>
        </div>
        <div className='footer'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
