import React from 'react';
import Cart from './Cart';
import { NavLink, Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div className='header'>
      <div className='header__upper'>
        <div className='container'>
          <ul className='list list--hr list--hr-separator'>
            <li className='list__item'>
              <span className='info'>
                <i className='info__icon far fa-dot-circle'></i>
                <span className='info__data'>1234 Street Name, City Name</span>
              </span>
            </li>
            <li className='list__item'>
              <a href='/' className='info'>
                <i className='info__icon fab fa-whatsapp'></i>
                <span className='info__data'>123-456-7890</span>
              </a>
            </li>
            <li className='list__item'>
              <a href='/' className='info'>
                <i className='info__icon far fa-envelope'></i>
                <span className='info__data'>mail@domain.com</span>
              </a>
            </li>
          </ul>
          <ul className='list list--hr'>
            <li className='list__item'>
              <Link to='/about' className='link'>
                <i className='link__icon fas fa-angle-right'></i>
                About Us
              </Link>
            </li>
            <li className='list__item'>
              <Link to='/contact' className='link'>
                <i className='link__icon fas fa-angle-right'></i>
                Contact Us
              </Link>
            </li>
            <li className='list__item'>
              <div className='dropdown '>
                <div className='dropdown__header'>
                  <a href='/' className='link'>
                    <img className='flag flag-us' src='' alt='' />
                    English
                  </a>
                  <i className='fas fa-angle-down'></i>
                </div>

                <div className='dropdown__body'>
                  <ul className='dropdown__items list'>
                    <li className='dropdown__item list__item'>
                      <a href='/' className='link'>
                        <img className='flag flag-us' src='' alt='' />
                        English
                      </a>
                    </li>
                    <li className='dropdown__item list__item'>
                      <a href='/' className='link'>
                        <img className='flag flag-es' src='' alt='' />
                        Español
                      </a>
                    </li>
                    <li className='dropdown__item list__item'>
                      <a href='/' className='link'>
                        <img className='flag flag-fr' src='' alt='' />
                        Française
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='header__middle container'>
        <a href='/' className='header__logo-box'>
          <img className='header__logo' src='/img/logo.png' alt='' />
        </a>
        <div className='header__user-options'>
          <a href='/' className='link'>
            Login
          </a>
          <div className='dropdown'>
            <div className='dropdown__header'>
              <div
                className='image image--small image--circle'
                style={{ backgroundImage: "url('/img/PersonalImage.png')" }}
              ></div>
            </div>
            <div className='dropdown__body'></div>
          </div>
          <Cart
            cartItems={props.cartItems}
            onItemRemove={props.onItemRemove}
          ></Cart>
        </div>
      </div>
      <div className='header__lower container'>
        <nav className='nav'>
          <ul className='nav__items list list--hr'>
            <li className='nav__item'>
              <NavLink className='nav__link' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav__item dropdown '>
              <a className='nav__link dropdown__header' href='/'>
                Products
              </a>
              <div className='dropdown__body'>
                <ul className=' list'>
                  <li className='list__item'>
                    <Link className='nav__inner-link' to='/products'>
                      Product Listing
                    </Link>
                  </li>
                  <li className='list__item'>
                    <Link className='nav__inner-link' to='/product/add'>
                      Add Product
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className='nav__item'>
              <NavLink className='nav__link' to='/contact'>
                Contact Us
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink className='nav__link' to='/about'>
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
