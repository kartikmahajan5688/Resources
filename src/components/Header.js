import React from 'react'
import { Link } from 'react-router-dom';
import "./App.css"

const Header = () => {
  return (
    <header>
      <div id='left-header'>
        RESOLUT PARTNERS
      </div>
      <div id='right-header'>
        <ul>
          <Link to="/addresource">
            <li>Add Resource</li>
          </Link>
          <Link to="/resources">
            <li>Resources</li>
          </Link>
          <Link to="/login">
            <li>Logout</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header