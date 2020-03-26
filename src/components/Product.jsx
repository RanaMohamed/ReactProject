import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
  render() {
    const { id, data, discount, price, imageUrls } = this.props.product;
    return (
      <div className='item-medium-1'>
        {discount > 0 && <div className='item-medium-1__alert'>Sale</div>}
        <div
          className='item-medium-1__image image'
          style={{
            backgroundImage: `url(${imageUrls && imageUrls[0]})`
          }}
        >
          <a
            href='/'
            className='item-medium-1__action'
            onClick={e => {
              e.preventDefault();
              this.props.onAddToCart(this.props.product);
            }}
          >
            Add to Cart
          </a>
        </div>
        <a href='/'>
          <h4>{data[0]?.title}</h4>
          <div>
            {discount > 0 && <del>${price}</del>}
            <span className='lable'>${price - (discount | 0)}</span>
          </div>
        </a>
        <div className='crud-actions'>
          <Link to={`/product-details/${id}`}>
            <i className='far fa-eye'></i>
          </Link>
          <Link to={`/product/${id}`}>
            <i className='fas fa-edit'></i>
          </Link>
          <a href='/'>
            <i className='fas fa-trash-alt'></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
