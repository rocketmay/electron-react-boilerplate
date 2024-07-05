// src/components/Header.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  return (
    <header className="app-header">
      {isHomePage ? (
        <div></div>
        // <nav>
        //   <ul>
        //     <li><a href="/">Home</a></li>
        //     <li><a href="/configuration">Configuration</a></li>
        //     <li><a href="/tools">Tools</a></li>
        //     {/* Add more menu items as needed */}
        //   </ul>
        // </nav>
      ) : (
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      )}
    </header>
  );
};

export default Header;