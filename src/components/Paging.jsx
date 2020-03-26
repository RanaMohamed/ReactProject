import React from 'react';

const Paging = props => {
  const pages = [];
  for (var i = 0; i < props.pages; i++) {
    pages.push(i + 1);
  }
  return (
    <div className='paging'>
      <div
        className='paging__arrow'
        onClick={() => props.onPageChange(props.activePage - 1 || 1)}
      >
        <i className='fas fa-angle-left'></i>
      </div>
      {pages.map(page => (
        <div
          key={page}
          className={
            props.activePage === page
              ? 'paging__number active'
              : 'paging__number'
          }
          onClick={() => props.onPageChange(page)}
        >
          {page}
        </div>
      ))}
      <div
        className='paging__arrow'
        onClick={() =>
          props.onPageChange(
            Math.min(props.activePage + 1, Math.ceil(props.pages))
          )
        }
      >
        <i className='fas fa-angle-right'></i>
      </div>
    </div>
  );
};

export default Paging;
