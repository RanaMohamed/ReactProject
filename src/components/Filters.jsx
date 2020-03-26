import React from 'react';
import { connect } from 'react-redux';

const Filters = props => {
  const { categories, activeFilter } = props;
  return (
    <section className='filters'>
      <div className='search-box'>
        <input
          className='search-box__input'
          placeholder='Search...'
          type='text'
          name='txt_search'
          id=''
          value={props.search}
          onChange={props.onSearch}
        />
        <button type='submit' className='search-box__btn'>
          <i className='fas fa-search'></i>
        </button>
      </div>
      <div>
        <h5>Categories</h5>
        <ul className='list list--vr-separator'>
          {categories.map(cat => (
            <li
              key={cat.id}
              className={
                'link list__item ' + (activeFilter === cat.id && 'active')
              }
              onClick={() => props.onChangeCategory(cat.id)}
            >
              <i className='link__icon fas fa-angle-right'></i>
              {cat.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Tags</h5>
        <div className='tags'>
          <span className='tag'>Nike</span>
          <span className='tag'>Travel</span>
          <span className='tag'>Sport</span>
          <span className='tag'>Tv</span>
          <span className='tag'>Books</span>
          <span className='tag'>Tech</span>
          <span className='tag'>Addidas</span>
          <span className='tag'>Promo</span>
          <span className='tag'>Reading</span>
          <span className='tag'>Social</span>
          <span className='tag'>New</span>
          <span className='tag'>Special</span>
          <span className='tag'>Food</span>
          <span className='tag'>Used</span>
        </div>
      </div>
      <div>
        <h5> </h5>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
const mapStateToProps = state => {
  return {
    categories: state.categories.items
  };
};
export default connect(mapStateToProps)(Filters);
