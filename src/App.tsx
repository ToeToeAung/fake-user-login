import React, { useState, useEffect } from 'react';
import Login from './Login'

const Dashboard = () => <h2>Welcome to your Dashboard!</h2>;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string } | null>(null);


  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (authStatus === 'true' && loggedInUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(loggedInUser)); // Parse the JSON object stored in localStorage
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setCurrentUser(null);

  };
  const handleLogin = (user: { username: string; name: string }) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {currentUser?.name}</h2>
          <p><strong>Username:</strong> {currentUser?.username}</p> 
        

          <Dashboard />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
