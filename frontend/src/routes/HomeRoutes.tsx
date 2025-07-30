// HomeRoutes.tsx
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from '../pages/AboutUs/AboutUs';
import Login from '../pages/Login/login-page';

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      {/* Add other home-related routes */}
    </Routes>
  );
};

export default HomeRoutes;
