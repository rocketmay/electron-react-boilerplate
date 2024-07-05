import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Tools.css';

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const pages = [
    { name: 'Config', path: '/configuration' },
    // { name: 'Settings', path: '/settings' },
    // { name: 'Profile', path: '/profile' },
    // { name: 'Messages', path: '/messages' },
    // { name: 'Analytics', path: '/analytics' },
    // { name: 'Help', path: '/help' },
    // Add more pages as needed
  ];

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tools-container page-content">
      <h1>Tools</h1>
      <input
        type="text"
        placeholder="Search pages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul className="page-list">
        {filteredPages.map((page) => (
          <li key={page.path}>
            <Link to={page.path}>{page.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tools;