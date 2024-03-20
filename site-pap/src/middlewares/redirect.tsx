import { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn') || localStorage.getItem('isLoggedIn') !== 'true') {

      window.location.href = 'login.html';
    }
  }, []);

  return null;
};

export default Redirect;