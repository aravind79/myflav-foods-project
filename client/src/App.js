// Example of a login function in your React code
const handleLogin = async (username, password) => {
  const apiUrl = process.env.REACT_APP_API_URL; // Vercel sets this for you
  
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  // ... handle login logic
};

