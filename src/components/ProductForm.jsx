import React, { Component } from 'react';
import Joi from 'joi-browser';
import axios from '../axios';
import { connect } from 'react-redux';
import { addProduct, editProduct } from '../actions/productsActions';

class ProductForm extends Component {
  state = {
    product: {
      data: [],
      imageUrls: ['/img/products/product-grey-1.jpg'],
      price: '',
      discount: '',
      categoryId: '',
      types: []
      // tags: ['tag1', 'tag2']
    },
    errors: {},
    activeTab: 0,
    onSale: true
  };

  dataSchema = {
    title: Joi.string().label('Name'),
    description: Joi.string().label('Description')
  };

  schema = {
    id: Joi,
    data: Joi.array().items(this.dataSchema),
    price: Joi.number().label('Price'),
    discount: Joi.number().label('Discount'),
    categoryId: Joi.required().label('Category'),
    types: Joi.array(),
    imageUrls: Joi.array()
    // tags: ['tag1', 'tag2']
  };

  componentDidMount() {
    this.initProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.languages.length !== this.props.languages.length) {
      this.initProduct();
    }
  }

  initProduct = async () => {
    let product = { ...this.state.product };
    const id = this.props.match.params.id;
    if (id !== 'add') {
      product = await axios.get(`http://localhost:3000/products/${id}`);
    }
    product.data = [...product.data];
    while (product.data.length < this.props.languages.length) {
      product.data.push({ title: '', description: '' });
    }
    this.setState({ product });
  };

  handleChange = ({ target }) => {
    const product = { ...this.state.product };
    product[target.name] = parseInt(target.value)
      ? parseInt(target.value)
      : target.value;
    this.setState({ product });
  };
  handleChangeArray = ({ target }) => {
    const product = { ...this.state.product };
    const ind = target.name.split('.');
    product[ind[0]][ind[1]][ind[2]] = target.value;
    this.setState({ product });
  };
  handleCheckbox = ({ target }) => {
    const product = { ...this.state.product };
    const value = parseInt(target.value)
      ? parseInt(target.value)
      : target.value;
    product[target.name] = [...product[target.name]];
    const index = product[target.name].findIndex(item => item === value);
    if (index === -1) {
      product[target.name].push(value);
    } else {
      product[target.name].splice(index, 1);
    }
    this.setState({ product });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const errs = Joi.validate(this.state.product, this.schema, {
      abortEarly: false
    }).error;
    const errors = {};
    if (errs) {
      errs.details.map(e => (errors[e.path] = e.message));
    }
    this.setState({ errors });
    if (errs === null) {
      let product = { ...this.state.product };
      const id = this.props.match.params.id;
      if (id === 'add') {
        await this.props.addProduct(product);
      } else {
        await this.props.editProduct(product);
      }
      this.props.history.push('/products');
    }
  };
  changeSale = onSale => {
    this.setState({ onSale });
  };
  render() {
    return (
      <form className='add-product' action='' onSubmit={this.handleSubmit}>
        <div className='add-product__images slider'>
          <div className='add-product__image-actions'>
            <div className='add-product__image-action'>
              <a href='/'>
                <i className='fas fa-plus-square'></i>
              </a>
              <a href='/'>
                <i className='fas fa-edit'></i>
              </a>
              <a href='/'>
                <i className='fas fa-trash-alt'></i>
              </a>
            </div>
          </div>
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
        <div className='add-product__data'>
          <div className='form-controls'>
            {this.state.product.data.length === this.props.languages.length && (
              <section className='tabs'>
                <div className='tabs__headers'>
                  {this.props.languages.map(lang => (
                    <div
                      key={lang.id}
                      className={
                        this.state.activeTab === lang.id
                          ? 'tabs__header active'
                          : 'tabs__header'
                      }
                      onClick={() => this.setState({ activeTab: lang.id })}
                    >
                      {lang.title}
                    </div>
                  ))}
                </div>
                <div className='tabs__bodies'>
                  {this.props.languages.map(lang => (
                    <div
                      key={lang.id}
                      className={
                        this.state.activeTab === lang.id
                          ? 'tabs__body active'
                          : 'tabs__body'
                      }
                    >
                      <div
                        className={
                          'form-group ' +
                          (this.state.errors[`data,${lang.id},title`] &&
                            'invalid')
                        }
                      >
                        <label htmlFor={'title' + lang.id}>Name</label>
                        <input
                          className='form-control'
                          type='text'
                          name={`data.${lang.id}.title`}
                          id={'title' + lang.id}
                          value={this.state.product.data[lang.id].title}
                          onChange={this.handleChangeArray}
                        />
                        <small style={{ color: '#ed5348' }}>
                          {this.state.errors[`data,${lang.id},title`]}
                        </small>
                      </div>
                      <div
                        className={
                          'form-group ' +
                          (this.state.errors[`data,${lang.id},description`] &&
                            'invalid')
                        }
                      >
                        <label htmlFor={'description' + lang.id}>
                          Description
                        </label>
                        <textarea
                          className='form-control'
                          cols='30'
                          rows='4'
                          name={`data.${lang.id}.description`}
                          id={'title' + lang.id}
                          value={this.state.product.data[lang.id].description}
                          onChange={this.handleChangeArray}
                        ></textarea>
                        <small style={{ color: '#ed5348' }}>
                          {this.state.errors[`data,${lang.id},description`]}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div
              className={'form-group ' + (this.state.errors.price && 'invalid')}
            >
              <label htmlFor='price'>Price</label>
              <input
                className='form-control'
                type='text'
                name='price'
                id='price'
                value={this.state.product.price}
                onChange={this.handleChange}
              />
              <small style={{ color: '#ed5348' }}>
                {this.state.errors.price}
              </small>
            </div>
            <div className='add-product__discount'>
              <div
                className={
                  'form-group ' + (this.state.errors.status && 'invalid')
                }
              >
                <label htmlFor='status'>Satus</label>
                <div className='form-group__radios'>
                  <div className='form-group__radio'>
                    <input
                      type='radio'
                      name='status'
                      id='onSale'
                      checked={this.state.onSale}
                      onChange={() => this.changeSale(true)}
                    />
                    <label
                      htmlFor='onSale'
                      style={{
                        marginBottom: 0,
                        fontWeight: 'initial',
                        padding: '0.4rem'
                      }}
                    >
                      On Sale
                    </label>
                  </div>
                  <div className='form-group__radio'>
                    <input
                      type='radio'
                      name='status'
                      id='notOnSale'
                      checked={!this.state.onSale}
                      onChange={() => this.changeSale(false)}
                    />
                    <label
                      htmlFor='notOnSale'
                      style={{
                        marginBottom: 0,
                        fontWeight: 'initial',
                        padding: '0.4rem'
                      }}
                    >
                      Not On Sale
                    </label>
                  </div>
                </div>
              </div>
              {this.state.onSale && (
                <div
                  className={
                    'form-group ' + (this.state.errors.discount && 'invalid')
                  }
                >
                  <label htmlFor='discount'>Discount</label>
                  <input
                    className='form-control'
                    type='text'
                    name='discount'
                    id='discount'
                    value={this.state.product.discount}
                    onChange={this.handleChange}
                  />
                  <small style={{ color: '#ed5348' }}>
                    {this.state.errors.discount}
                  </small>
                </div>
              )}
            </div>
            <div
              className={'form-group ' + (this.state.errors.types && 'invalid')}
            >
              <label htmlFor='type'>Payment Types</label>
              <div className='form-group__checkboxs'>
                {this.props.paymentTypes.map(type => (
                  <div className='form-group__checkbox' key={type.id}>
                    <input
                      type='checkbox'
                      name='types'
                      id={'types' + type.id}
                      value={type.id}
                      checked={
                        this.state.product.types.find(t => t === type.id)
                          ? true
                          : false
                      }
                      onChange={this.handleCheckbox}
                    />
                    <label
                      style={{
                        marginBottom: 0,
                        fontWeight: 'initial',
                        padding: '0.4rem'
                      }}
                      htmlFor={'types' + type.id}
                    >
                      {type.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={
                'form-group ' + (this.state.errors.categoryId && 'invalid')
              }
            >
              <label htmlFor='categoryId'>Category</label>
              <select
                className='form-control'
                name='categoryId'
                id='categoryId'
                value={this.state.product.categoryId}
                onChange={this.handleChange}
              >
                {this.props.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className='taged-textbox form-group'>
              <label className='taged-textbox__lable' htmlFor=''>
                Tags
              </label>
              <div className='taged-textbox__data'>
                <div className='taged-textbox__tags'>
                  <div className='taged-textbox__tag'>
                    <span>tag1</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag2</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag3</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag4</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag5</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag6</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag7</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag8</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag9</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                  <div className='taged-textbox__tag'>
                    <span>tag10</span>
                    <a href='/' className='taged-textbox__remove'>
                      <i className='fas fa-times'></i>
                    </a>
                  </div>
                </div>
                <div className='taged-textbox__clear'>
                  <a href='/'>
                    <i className='fas fa-times'></i>
                  </a>
                </div>
              </div>
              <input
                className='taged-textbox__textbox form-control'
                type='text'
                name=''
                id=''
              />
            </div>*/}
            <div className='add-product__actions'>
              <button href='#' className='btn btn--gray'>
                Cancel
              </button>
              <button href='#' className='btn btn--primary'>
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.items,
    languages: state.languages.items,
    paymentTypes: state.paymentTypes.items
  };
};
export default connect(mapStateToProps, { addProduct, editProduct })(
  ProductForm
);
