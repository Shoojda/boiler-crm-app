// src/layout/MainLayout.js
import React from 'react';
import TopRightSettings from '../components/TopRightSettings';

const MainLayout = ({ children, toggleTheme, theme }) => {
  return (
    <div className="layout-container">
      <TopRightSettings toggleTheme={toggleTheme} theme={theme} />
      {children}
    </div>
  );
};

export default MainLayout;
