import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCartItem } from '../actions/cartActions';

class Cart extends Component {
  state = {
    opened: false
  };
  toggleCart = () => {
    this.setState({ opened: !this.state.opened });
  };
  render() {
    const classes = this.state.opened
      ? 'dropdown dropdown--left dropdown--opened'
      : 'dropdown dropdown--left';

    const { cartItems } = this.props;

    let total = 0;
    cartItems.map(
      item =>
        (total +=
          (item.product.price - (item.product.discount | 0)) * item.count)
    );

    return (
      <div className={classes}>
        <div className='dropdown__header' onClick={this.toggleCart}>
          <div
            className='image image--small'
            style={{
              backgroundImage: "url('/img/icons/icon-cart-big.svg')"
            }}
          >
            <div className='notification notification--danger'>
              {cartItems.length}
            </div>
          </div>
        </div>
        <div className='dropdown__body'>
          <ul className='dropdown__items list list--vr-separator'>
            {cartItems.map(item => (
              <li key={item.product.id} className='dropdown__item list__item'>
                <div className='item-small-1'>
                  <div className='item-small-1__data'>
                    <a href='/' className='item-small-1__title'>
                      {item.product.data[0].title}
                    </a>
                    <span className='item-small-1__description'>
                      {item.count} X $
                      {item.product.price - (item.product.discount | 0)}
                    </span>
                  </div>
                  <div className='item-small-1__image-box'>
                    <a
                      href='/'
                      className='item-small-1__image image'
                      style={{
                        backgroundImage: `url(${item.product.imageUrls[0]})`
                      }}
                    >
                      {' '}
                    </a>
                    <a
                      href='/'
                      className='item-small-1__action'
                      onClick={e => {
                        e.preventDefault();
                        this.props.removeCartItem(item);
                      }}
                    >
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='separator'></div>
          <div className='block'>
            <span className='lable'>Total:</span>
            <span className='lable'>${total}</span>
          </div>
          <div className='block list list--hr'>
            <a className='list-item btn btn--gray' href='/'>
              View Cart
            </a>
            <a className='list-item btn btn--primary' href='/'>
              Checkout
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.items
  };
};
export default connect(mapStateToProps, { removeCartItem })(Cart);
