import { useState, useEffect } from 'react';
import axios from 'axios';

export const useVerifyToken = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isValid, setIsValid] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/token-auth', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          if (response.data.message === 'Token válido!') {
            //console.log(token)
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        })
        .catch(error => {
          setIsValid(false);
          handleLogout();
        });
    }
  }, [token]);
  return isValid;
};