import React, { useState, useEffect, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer1';

import './App.css';
import checkLoggedUser from './utils/utils';
import AuthRoutes from './routes/AuthRoutes';
import HomeRoutes from './routes/HomeRoutes';
import LandingPage from './pages/LandingPage/LandingPage';
import UserProfile from './pages/Profile/Profile';
import Breadcrumb from './components/Navbar/BreadCrumb';

function App() {

  const [theme, setTheme] = useState('light');
  useEffect(() => {
    
    // Update theme on body element
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const toggleTheme = () => {
    // Toggle between light and dark themes
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  return (
<Router>
  <div className={`App ${theme}`}>
    <ResponsiveAppBar theme={theme} toggleTheme={toggleTheme} />
    <Breadcrumb />
    <main style={{ flex: 1 }}> {/* This allows the content to grow */}
      <Routes>
        <Route path="/" element={<LandingPage theme={theme} />} />
      </Routes>
      <HomeRoutes />
      <AuthRoutes />
    </main>
    <Footer theme={theme} toggleTheme={toggleTheme} />
  </div>
</Router>
  );
}

export default App;
