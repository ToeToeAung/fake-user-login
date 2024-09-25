import React, { useState } from 'react';


interface LoginProps {
    onLogin: (user: { username: string; name: string }) => void;
  }

const Login = ({ onLogin } :LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fakeUsers = [
        { username: 'admin', password: 'password123', name: 'Admin User' },
        { username: 'johndoe', password: 'johnpassword', name: 'John Doe' },
        { username: 'janedoe', password: 'janepassword', name: 'Jane Doe' },
      ];

      const user = fakeUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Store user in localStorage and call onLogin with user data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;