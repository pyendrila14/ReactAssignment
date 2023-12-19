import React from 'react'
import product from './../../assets/product.png';


function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={product} width="30" height="30" className="d-inline-block align-top" alt="" />&nbsp;
          Products
        </a>
      </div>
    </nav>
  )
}

export default Navbar