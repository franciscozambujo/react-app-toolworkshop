import React, { useState, createContext, useEffect, useContext } from 'react';

interface TokenContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  userRole: string | null;
  username: string | null;
  login: (username: string, role: string) => void;
  logout: () => void;
  token: string | null;
}

const TokenContext = createContext<TokenContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  userRole: null,
  username: null,
  login: () => {},
  logout: () => {},
  token: null,
});

const useAuth = () => useContext(AuthContext);
const useToken = () => useContext(TokenContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    if (storedUserRole) {
      setUserRole(storedUserRole);
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (username: string, role: string) => {
    setUserRole(role);
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUsername(null);
    setToken(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  const handleTokenLogin = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleTokenLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    isLoggedIn,
    userRole,
    username,
    login: handleLogin,
    logout: handleLogout,
    token,
    loginToken: handleTokenLogin,
    logoutToken: handleTokenLogout,
  };

  return (
    <TokenContext.Provider value={{ token, login: handleTokenLogin, logout: handleTokenLogout }}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </TokenContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth, TokenContext, useToken };