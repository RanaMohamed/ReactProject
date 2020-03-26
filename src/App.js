import React, { Component } from 'react';

import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import Root from './components/Root';

class App extends Component {
  // state = {
  //   languages: [],
  //   paymentTypes: [],
  //   cartItems: []
  // };

  // addToCartHandler = (product, quantity = 1) => {
  //   const cartItems = [...this.state.cartItems];
  //   let index = cartItems.findIndex(item => item.product.id === product.id);
  //   if (index !== -1) {
  //     cartItems[index] = { ...cartItems[index] };
  //     cartItems[index].count += quantity;
  //   } else {
  //     cartItems.push({ product: { ...product }, count: quantity });
  //   }
  //   this.setState({ cartItems });
  // };

  // removeItemHandler = item => {
  //   const cartItems = this.state.cartItems.filter(
  //     cartItem => item.product.id !== cartItem.product.id
  //   );
  //   this.setState({ cartItems });
  // };

  // editProductHandler = product => {
  //   const products = [...this.state.products];
  //   const index = products.findIndex(p => p.id === product.id);
  //   products[index] = product;
  //   this.setState({ products });
  // };

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Root></Root>
        </React.Fragment>
      </Provider>
    );
  }
}
export default App;
