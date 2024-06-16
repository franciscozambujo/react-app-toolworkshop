import React, { useState, createContext, useEffect, useContext } from 'react';

interface AuthContextValue {
  userRole: string | null;
  username: string | null;
  login: (username: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  userRole: null,
  username: null,
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');

    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username: string, role: string) => {
    setUserRole(role);
    setUsername(username);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setUserRole(null);
    setUsername(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.setItem('isLoggedIn', 'false');
  };

  const value = {
    userRole,
    username,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, useAuth };  