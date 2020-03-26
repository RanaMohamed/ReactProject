import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import languagesReducer from './languagesReducer';
import paymentTypesReducer from './paymentTypesReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  languages: languagesReducer,
  paymentTypes: paymentTypesReducer,
  cart: cartReducer
});

export default rootReducer;
