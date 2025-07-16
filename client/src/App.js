/*
--- client/src/App.js (Corrected) ---

This is the corrected code for your main App.js file.
This file acts as the "main switchboard" for your React application,
directing users to the correct page (Website or Dashboard).

Instructions:
1. Replace the entire content of your `client/src/App.js` file with this code.
2. Ensure your `client/src/pages/Website.js` file starts with `export default function Website() { ... }`
3. Ensure your `client/src/pages/Dashboard.js` file starts with `export default function Dashboard() { ... }`
*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Import your two main application components
import Website from './pages/Website';
import Dashboard from './pages/Dashboard';

// A placeholder for your login page component
function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;

        if (!apiUrl) {
            alert('API URL is not configured. Please check deployment environment variables.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login Successful!');
                // In a real app, you would save the token (e.g., in localStorage)
                // localStorage.setItem('userToken', data.token);
                navigate('/dashboard');
            } else {
                alert(`Login Failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error connecting to the server. Please try again later.');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#111827', color: 'white' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '40px', backgroundColor: '#1f2937', borderRadius: '8px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Staff Login</h1>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: 'none', color: 'black' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: 'none', color: 'black' }}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '12px', background: '#b91c1c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
                        Login
                    </button>
                </form>
                 <Link to="/" style={{ color: '#facc15', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
                    ← Back to Main Website
                </Link>
            </div>
        </div>
    );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the public-facing website. The "/*" is a wildcard to match all sub-paths. */}
        <Route path="/*" element={<Website />} />

        {/* Route for the staff login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the internal dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
