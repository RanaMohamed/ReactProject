import React, { Component } from 'react';
import Product from './Product';
import Filters from './Filters';
import Paging from './Paging';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductList extends Component {
  state = {
    perPage: 3,
    activePage: 1,
    sort: 1,
    category: 0,
    search: ''
  };

  pageChangeHandler = page => {
    this.setState({ activePage: page });
  };

  changeSort = e => {
    this.setState({ sort: parseInt(e.target.value), activePage: 1 });
  };

  categoryChangeHandler = category => {
    this.setState({ category, activePage: 1 });
  };

  searchHandler = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { products } = this.props;
    const { activePage, perPage, sort, category, search } = this.state;

    let filteredProducts = [...products];
    if (category !== 0) {
      filteredProducts = filteredProducts.filter(
        prod => prod.categoryId === category
      );
    }

    let searchedProducts = [...filteredProducts];
    searchedProducts = searchedProducts.filter(p =>
      p.data[0].title.toLowerCase().includes(search.toLowerCase())
    );

    let sortedProducts = [...searchedProducts];

    if (sort === 2) {
      sortedProducts.sort(function(a, b) {
        return a.price - (a.discount | 0) - (b.price - (b.discount | 0));
      });
    } else if (sort === 3) {
      sortedProducts.sort(function(a, b) {
        return a.price - (a.discount | 0) - (b.price - (b.discount | 0));
      });
      sortedProducts.reverse();
    } else if (sort === 4) {
      sortedProducts.sort(function(a, b) {
        return a.data[0].title.toLowerCase() < b.data[0].title.toLowerCase()
          ? -1
          : 0;
      });
    }
    const shownProducts = sortedProducts.slice(
      (activePage - 1) * perPage,
      (activePage - 1) * perPage + perPage
    );
    return (
      <React.Fragment>
        <Filters
          activeFilter={category}
          onChangeCategory={this.categoryChangeHandler}
          search={this.state.search}
          onSearch={this.searchHandler}
        ></Filters>
        <section className='item-listing'>
          <div className='item-listing__tools'>
            <select
              className='form-control'
              name=''
              id=''
              onChange={this.changeSort}
            >
              <option value='1'>Featured</option>
              <option value='2'>Price low to high</option>
              <option value='3'>Price high to low</option>
              <option value='4'>Name</option>
            </select>
            <Link className='action-btn' to='/product/add'>
              <i className='fas fa-plus'></i>
            </Link>
          </div>
          <div className='item-listing__items item-listing--3items'>
            {shownProducts.map(prod => (
              <Product key={prod.id} product={prod}></Product>
            ))}
          </div>
          {sortedProducts.length > perPage && (
            <Paging
              pages={sortedProducts.length / perPage}
              activePage={activePage}
              onPageChange={this.pageChangeHandler}
            ></Paging>
          )}
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.items,
    categories: state.categories.items
  };
};
export default connect(mapStateToProps)(ProductList);
