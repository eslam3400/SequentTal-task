import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/home';
import GoogleAuthPage from './pages/auth/google-auth';
import PostsPage from './pages/posts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/google" element={<GoogleAuthPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);