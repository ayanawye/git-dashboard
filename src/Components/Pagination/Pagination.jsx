import React, { useState } from 'react'
import './Pagination.scss'

const Pagination = ({ repositoriesPerPage, totalRepocitories, paginate, currentPage }) => {
  const pageNumber = []
  for(let i = 1; i <= Math.ceil(totalRepocitories / repositoriesPerPage); i++){
    pageNumber.push(i)
  }

  return (
    <div className='pagination flex aling-center justify-center'>
      <ul className="pagination__container flex">
        {pageNumber.length > 1 ? 
          pageNumber.map(number => (
            <li key={number} className={currentPage == number ? "active": null}>
              <a href="#" className="pagination__link" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))
          : 
          <div></div>
        }
      </ul>
    </div>
  )
}

export default Pagination