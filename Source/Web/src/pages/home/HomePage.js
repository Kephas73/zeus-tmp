import { Link } from 'react-router-dom';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <nav className="host-container-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/host">Host Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
