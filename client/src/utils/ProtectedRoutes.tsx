import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/data/AuthProvider';

type ProtectedRouteProps = { children: React.ReactNode };

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  console.log(isLoggedIn);

  if (isLoggedIn == false) {
    navigate('/login');
  }
  else{
    return children;
  }
}