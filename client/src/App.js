// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Website from './pages/Website';
import Dashboard from './pages/Dashboard';

function LoginPage() {
    // A placeholder for your future login page
    return (
        <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
            <h1>Staff Login Page</h1>
            <p>A login form will go here.</p>
            <a href="/dashboard" style={{color: 'yellow'}}>Simulate Login & Go to Dashboard</a>
        </div>
    );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/*" element={<Website />} />

        {/* Internal App Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}