import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Toaster, toast } from 'sonner';
import { AuthContext } from "@/data/AuthContext";
import * as bcrypt from 'bcryptjs';

export function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
  
    const formData = {
      user: (event.target as HTMLFormElement).user.value,
      password: (event.target as HTMLFormElement).password.value,
    };
  
    try {
      const response = await fetch(
        `http://localhost:3000/usersPass?user=${formData.user}`
      );
      const data = await response.json();
      const userFromDB = data[0];
  
      if (userFromDB) {
        const passwordFromDB = userFromDB.password;
        console.log('Senha do banco de dados:', passwordFromDB);
        console.log(userFromDB.cargo);
        console.log('Senha do user introduzida:', formData.password);

        const isValid = bcrypt.compareSync(formData.password, passwordFromDB);

        if (isValid) {
          if (userFromDB.cargo === 'owner') {
            console.log(userFromDB.cargo);
            login(formData.user, 'owner');
            localStorage.setItem('isLoggedIn', 'true');
            toast.success(`Login efetuado com sucesso!`, {
              duration: 5000,
            });
            setTimeout(() => {
              window.location.href = '/empresa/ownerpage';
            }, 2000);
          } else if (userFromDB.cargo === 'employee') {
            console.log(userFromDB.cargo);
            login(formData.user, 'employee');
            localStorage.setItem('isLoggedIn', 'true');
            toast.success(`Login efetuado com sucesso!`, {
              duration: 5000,
            });
            setTimeout(() => {
              window.location.href = '/empresa/employeepage';
            }, 2000);
          } else if (userFromDB.cargo === 'client') {
            console.log(userFromDB.cargo);
            login(formData.user, 'client');
            localStorage.setItem('isLoggedIn', 'true');
            toast.success(`Login efetuado com sucesso!`, {
              duration: 5000,
            });
            setTimeout(() => {
              window.location.href = '/cliente/clientArea';
            }, 2000);
          }
        } else {
          toast.error('Credenciais inválidas!')
          localStorage.setItem('isLoggedIn', 'false');
        }
      } else {
        toast.error('Usuário não encontrado!')
        localStorage.setItem('isLoggedIn', 'false');
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