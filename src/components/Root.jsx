import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import Contact from './Contact';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductDetails from './ProductDetails';
import { fetchCategories } from '../actions/categoriesActions';
import { fetchProducts } from '../actions/productsActions';
import { fetchLanguages } from '../actions/languagesActions';
import { fetchPaymentTypes } from '../actions/paymentTypesActions';
import Footer from './Footer';

const Root = props => {
  useEffect(() => {
    props.fetchCategories();
    props.fetchProducts();
    props.fetchLanguages();
    props.fetchPaymentTypes();
  });
  return (
    <React.Fragment>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route path='/about' component={About}></Route>
          <Route path='/contact' component={Contact}></Route>
          <Route path='/products' component={ProductList}></Route>
          <Route path='/product/:id' component={ProductForm}></Route>
          <Route path='/product-details/:id' component={ProductDetails}></Route>
          <Redirect from='/' to='/products' />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default connect(null, {
  fetchProducts,
  fetchCategories,
  fetchLanguages,
  fetchPaymentTypes
})(Root);
