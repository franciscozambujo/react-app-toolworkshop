import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Toaster, toast } from 'sonner';

export function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const formData = {
      user: (event.target as HTMLFormElement).user.value,
      password: (event.target as HTMLFormElement).password.value,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/usersByRole?user=${formData.user}&password=${formData.password}`
      );
      const data = await response.json();

      if (data === 'owner') {
        console.log(data);
        toast.success(`Login efetuado com sucesso!`, {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.href = '/empresa/geral';
        }, 2000);
      } else if (data === 'employee') {
        console.log(data);
        toast.success(`Login efetuado com sucesso!`, {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.href = '/empresa/employeepage';
        }, 2000);
      } else if (data === 'client') {
        console.log(data);
      } else {
        toast.error('Credenciais inválidas!')
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao iniciar sessão. Tente novamente.');
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md flex flex-col p-4 rounded-md text-black font-bodyfooter">
        <div className="text-2xl font-bold mb-2 text-white text-center">
          Oficina Fernando Costa Fialho <span className="text-[#53AE6E]"><br />Área do Cliente</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-white">Inicie sessão na sua conta</div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="block relative">
            <label className="label-login">Username</label>
            <input
              type="text"
              id="user"
              className="input-login"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <label className="label-login mt-6">Password</label>
            <input
              type="password"
              id="password"
              className="input-login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="bg-body w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
            Entrar
          </Button>
        </form>
        <div className="text-sm text-center mt-[1.6rem] text-[#53AE6E]">
          Não tem uma conta? <br />
          <Link to="/createuser">
            <a className="text-sm text-white z-10 hover:underline">Registe-se aqui gratuitamente!</a>
          </Link>
        </div>
      </div>
      <Toaster richColors/>
    </div>
  );
}