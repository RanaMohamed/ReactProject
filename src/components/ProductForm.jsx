import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import axios from '../axios';
import { connect } from 'react-redux';
import { addProduct, editProduct } from '../actions/productsActions';

const ProductForm = props => {
  const [onSale, setOnSale] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    data: [],
    imageUrls: ['/img/products/product-grey-1.jpg'],
    price: '',
    discount: '',
    categoryId: '',
    types: []
    // tags: ['tag1', 'tag2']
  });

  const dataSchema = {
    title: Joi.string().label('Name'),
    description: Joi.string().label('Description')
  };

  const schema = {
    id: Joi,
    data: Joi.array().items(dataSchema),
    price: Joi.number().label('Price'),
    discount: Joi.number().label('Discount'),
    categoryId: Joi.required().label('Category'),
    types: Joi.array(),
    imageUrls: Joi.array()
    // tags: ['tag1', 'tag2']
  };

  useEffect(() => {
    initProduct();
  }, [props.languages, props.match.params.id]);

  const initProduct = async () => {
    let p = { ...product };
    const id = props.match.params.id;
    if (id !== 'add') {
      p = await axios.get(`http://localhost:3000/products/${id}`);
    }
    p.data = [...p.data];
    while (p.data.length < props.languages.length) {
      p.data.push({ title: '', description: '' });
    }
    setProduct(p);
  };

  const handleChange = ({ target }) => {
    const p = { ...product };
    p[target.name] = parseInt(target.value)
      ? parseInt(target.value)
      : target.value;
    setProduct(p);
  };
  const handleChangeArray = ({ target }) => {
    const p = { ...product };
    const ind = target.name.split('.');
    p[ind[0]][ind[1]][ind[2]] = target.value;
    setProduct(p);
  };
  const handleCheckbox = ({ target }) => {
    const p = { ...product };
    const value = parseInt(target.value)
      ? parseInt(target.value)
      : target.value;
    p[target.name] = [...p[target.name]];
    const index = p[target.name].findIndex(item => item === value);
    if (index === -1) {
      p[target.name].push(value);
    } else {
      p[target.name].splice(index, 1);
    }
    setProduct(p);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const errs = Joi.validate(product, schema, {
      abortEarly: false
    }).error;
    const errors = {};
    if (errs) {
      errs.details.map(e => (errors[e.path] = e.message));
    }
    setErrors(errors);
    if (errs === null) {
      let p = { ...product };
      const id = props.match.params.id;
      if (id === 'add') {
        await props.addProduct(p);
      } else {
        await props.editProduct(p);
      }
      props.history.push('/products');
    }
  };

  return (
    <form className='add-product' action='' onSubmit={handleSubmit}>
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
          {product.data.length === props.languages.length && (
            <section className='tabs'>
              <div className='tabs__headers'>
                {props.languages.map(lang => (
                  <div
                    key={lang.id}
                    className={
                      activeTab === lang.id
                        ? 'tabs__header active'
                        : 'tabs__header'
                    }
                    onClick={() => setActiveTab(lang.id)}
                  >
                    {lang.title}
                  </div>
                ))}
              </div>
              <div className='tabs__bodies'>
                {props.languages.map(lang => (
                  <div
                    key={lang.id}
                    className={
                      activeTab === lang.id ? 'tabs__body active' : 'tabs__body'
                    }
                  >
                    <div
                      className={
                        'form-group ' +
                        (errors[`data,${lang.id},title`] && 'invalid')
                      }
                    >
                      <label htmlFor={'title' + lang.id}>Name</label>
                      <input
                        className='form-control'
                        type='text'
                        name={`data.${lang.id}.title`}
                        id={'title' + lang.id}
                        value={product.data[lang.id].title}
                        onChange={handleChangeArray}
                      />
                      <small style={{ color: '#ed5348' }}>
                        {errors[`data,${lang.id},title`]}
                      </small>
                    </div>
                    <div
                      className={
                        'form-group ' +
                        (errors[`data,${lang.id},description`] && 'invalid')
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
                        value={product.data[lang.id].description}
                        onChange={handleChangeArray}
                      ></textarea>
                      <small style={{ color: '#ed5348' }}>
                        {errors[`data,${lang.id},description`]}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          <div className={'form-group ' + (errors.price && 'invalid')}>
            <label htmlFor='price'>Price</label>
            <input
              className='form-control'
              type='text'
              name='price'
              id='price'
              value={product.price}
              onChange={handleChange}
            />
            <small style={{ color: '#ed5348' }}>{errors.price}</small>
          </div>
          <div className='add-product__discount'>
            <div className={'form-group ' + (errors.status && 'invalid')}>
              <label htmlFor='status'>Satus</label>
              <div className='form-group__radios'>
                <div className='form-group__radio'>
                  <input
                    type='radio'
                    name='status'
                    id='onSale'
                    checked={onSale}
                    onChange={() => setOnSale(true)}
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
                    checked={!onSale}
                    onChange={() => setOnSale(false)}
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
            {onSale && (
              <div className={'form-group ' + (errors.discount && 'invalid')}>
                <label htmlFor='discount'>Discount</label>
                <input
                  className='form-control'
                  type='text'
                  name='discount'
                  id='discount'
                  value={product.discount}
                  onChange={handleChange}
                />
                <small style={{ color: '#ed5348' }}>{errors.discount}</small>
              </div>
            )}
          </div>
          <div className={'form-group ' + (errors.types && 'invalid')}>
            <label htmlFor='type'>Payment Types</label>
            <div className='form-group__checkboxs'>
              {props.paymentTypes.map(type => (
                <div className='form-group__checkbox' key={type.id}>
                  <input
                    type='checkbox'
                    name='types'
                    id={'types' + type.id}
                    value={type.id}
                    checked={
                      product.types.find(t => t === type.id) ? true : false
                    }
                    onChange={handleCheckbox}
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
          <div className={'form-group ' + (errors.categoryId && 'invalid')}>
            <label htmlFor='categoryId'>Category</label>
            <select
              className='form-control'
              name='categoryId'
              id='categoryId'
              value={product.categoryId}
              onChange={handleChange}
            >
              {props.categories.map(cat => (
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
};

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
