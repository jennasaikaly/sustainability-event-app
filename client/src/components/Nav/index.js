import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Nav() {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <h2>
        <Link to="/">
          <span role="img" aria-label="plant"> 🌿</span> Sustainable Event App
        </Link>
      </h2>
      <nav className="text-center">
        {Auth.loggedIn() ? (
          <>
            <Link to="/profile">My Events</Link>
            <a href="/" onClick={logout}>
        Logout
      </a>
          </>
        ) : (
          <>
          <Link to="/">
              Browse Events
            </Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Nav;