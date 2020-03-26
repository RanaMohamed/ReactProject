import React, { Component } from 'react';
import axios from '../axios';
import Product from './Product';

class ProductDetails extends Component {
  state = {
    product: {
      data: []
    },
    quantity: 1,
    relatedProducts: []
  };

  componentDidMount() {
    this.getProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getProduct();
    }
  }

  getProduct = async () => {
    let product = { ...this.state.product };
    const id = this.props.match.params.id;
    product = await axios.get(`http://localhost:3000/products/${id}`);
    const relatedProducts = await axios.get(
      `http://localhost:3000/products?categoryId=${product.categoryId}&_limit=4`
    );
    this.setState({ product, relatedProducts, quantity: 1 });
  };

  changeQuantity(quantity) {
    this.setState({ quantity });
  }
  render() {
    const { data, price, discount, categoryId } = this.state.product;
    return (
      <React.Fragment>
        <div className='container product-details'>
          <section className='product-details__main'>
            <div className='slider'>
              <div className='slider__items'>
                <div
                  className='slider__item active'
                  style={{
                    backgroundImage: 'url(/img/products/product-grey-7.jpg)'
                  }}
                ></div>
                <div
                  className='slider__item'
                  style={{
                    backgroundImage: 'url(/img/products/product-grey-7.jpg)'
                  }}
                ></div>
                <div
                  className='slider__item'
                  style={{
                    backgroundImage: 'url(/img/products/product-grey-7.jpg)'
                  }}
                ></div>
              </div>
              <div className='slider__indicators'>
                <span className='slider__indicator active'></span>
                <span className='slider__indicator'></span>
                <span className='slider__indicator'></span>
              </div>
            </div>
            <div className='product-details__info'>
              <h1>{data[0]?.title}</h1>
              <div className='rating'>
                <div className='rating__stars'>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='fas fa-star'></i>
                  <i className='far fa-star'></i>
                </div>
                <div className='rating__data'>2 reviews</div>
              </div>
              <div className='product-details__amount'>
                ${price - (discount || 0)}
              </div>
              <p className='product-details__desc'>{data[0]?.description}</p>
              <div className='product-details__add'>
                <div className='increment-control'>
                  <button
                    className='increment-control__action'
                    disabled={this.state.quantity === 1}
                    onClick={e =>
                      this.changeQuantity(this.state.quantity - 1 || 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type='text'
                    className='form-control'
                    title='Qty'
                    value={this.state.quantity}
                    onChange={e => this.changeQuantity(e.target.value)}
                  />
                  <button
                    className='increment-control__action'
                    onClick={e => this.changeQuantity(this.state.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className='btn btn--primary'
                  onClick={() =>
                    this.props.onAddToCart(
                      this.state.product,
                      this.state.quantity
                    )
                  }
                >
                  Add to cart
                </button>
              </div>
              <div className='product-details__meta'>
                Category:{' '}
                <a rel='tag' href='/'>
                  {
                    this.props.categories.find(cat => cat.id === categoryId)
                      ?.title
                  }
                </a>
                .
              </div>
            </div>
          </section>
          <section className='tabs'>
            <div className='tabs__headers'>
              <div className='tabs__header active'>Description</div>
              <div className='tabs__header'>Additional Information</div>
              <div className='tabs__header'>Reviews (2)</div>
            </div>
            <div className='tabs__bodies'>
              <div className='tabs__body active'>
                <div className='product-details__desc'>
                  <p>
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Fusce sagittis, massa fringilla
                    consequat blandit, mauris ligula porta nisi, non tristique
                    enim sapien vel nisl. Suspendisse vestibulum lobortis
                    dapibus.
                  </p>
                  <p>
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Fusce sagittis, massa fringilla
                    consequat blandit, mauris ligula porta nisi, non tristique
                    enim sapien vel nisl. Suspendisse vestibulum lobortis
                    dapibus. Vestibulum ante ipsum primis in faucibus orci
                    luctus et ultrices posuere cubilia Curae;
                  </p>
                </div>
              </div>
              <div className='tabs__body '>tab2</div>
              <div className='tabs__body'>tab3</div>
            </div>
          </section>
          <div className='separator'></div>
          <section className='realated-product'>
            <h3>
              Related <strong>Products</strong>
            </h3>
            <div className='item-listing__items item-listing--4items'>
              {this.state.relatedProducts.map(prod => (
                <Product
                  key={prod.id}
                  product={prod}
                  onAddToCart={this.props.onAddToCart}
                ></Product>
              ))}
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductDetails;
