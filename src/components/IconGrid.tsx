import React from 'react';
import { Link } from 'react-router-dom';
import './IconGrid.css';

const IconGrid = () => {
  const icons = [
    //{ name: 'Home', path: '/', icon: '🏠' },
    { name: 'Tools', path: '/tools', icon: '🛠️' },
    { name: 'Config', path: '/configuration', icon: '⚙️' },
    //{ name: 'Profile', path: '/profile', icon: '👤' },
    // Add more icons as needed
  ];

  return (
    <div className="icon-grid-container">
    <div className="icon-grid">
      {icons.map((icon) => (
        <Link key={icon.name} to={icon.path} className="icon-button">
          <div className="icon-content">
          <span className="icon">{icon.icon}</span>
          <span className="icon-name">{icon.name}</span>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default IconGrid;