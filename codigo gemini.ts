import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Toaster, toast } from 'sonner';
import { AuthContext } from "@/data/AuthContext";
import bcrypt from 'bcryptjs';

export function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      user: (event.target as HTMLFormElement).user.value,
      password: (event.target as HTMLFormElement).password.value,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/usersByLogin?user=${formData.user}`
      ); // Fetch user by username
      const data = await response.json();

      if (data.length === 0) {
        // User not found
        toast.error('Utilizador não encontrado.');
        return;
      }

      const { password: hashedPassword, role } = data[0]; // Access password hash

      // Compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(formData.password, hashedPassword);

      if (passwordMatch) {
        console.log('Login successful');
        login(formData.user, role);
        localStorage.setItem('isLoggedIn', 'true');
        toast.success(`Login efetuado com sucesso!`, {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.href = `/${role}/dashboard`; // Redirect based on role
        }, 2000);
      } else {
        toast.error('Credenciais inválidas!');
        localStorage.setItem('isLoggedIn', 'false');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao iniciar sessão. Tente novamente.');
    }
  };

  return (
    // ... rest of your JSX code remains the same
  );
}
