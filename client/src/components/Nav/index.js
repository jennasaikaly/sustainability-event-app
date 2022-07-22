import React from 'react';

function Nav() {

  return (
    <header>
      <h2>
        <a href="/">
          <span role="img" aria-label="plant"> 🌿</span> Sustainable Event App
        </a>
      </h2>
      <nav>
        <ul>
          <li className="mx-2">
            <a href="#events">
              Browse Events
            </a>
          </li>
          <li className="mx-2">
            <a href="#myevents">
              My Events
            </a>
          </li>
          <li>
            <span>Sign In </span>
          </li>
          <li>
            <span>Sign Out </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;