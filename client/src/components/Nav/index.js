import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <header>
      <h2>
      <Link to="/">
          <span role="img" aria-label="plant"> 🌿</span> Sustainable Event App
        </Link>
      </h2>
      <nav>
        <ul>
          <li className="mx-2">
            <Link to="/">
              Browse Events
            </Link>
          </li>
          <li className="mx-2">
            <a href="/profile">
              My Events
            </a>
          </li>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;