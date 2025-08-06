import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Link, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { AuthContext } from "@/data/AuthProvider";
import * as bcrypt from 'bcryptjs';

export function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { login, username } = useContext(AuthContext);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const formData = {
      user: (event.target as HTMLFormElement).user.value,
      password: (event.target as HTMLFormElement).password.value,
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/usersPass?user=${formData.user}`
      );

      const data = await response.json();
      const userFromDB = data[0];
  
      if (userFromDB) {
        const isValid = bcrypt.compareSync(formData.password, data[0].password);
  
        if (isValid) {
            if (userFromDB.cargo === 'owner') {
              console.log(userFromDB.cargo);
              login(formData.user, 'owner');
              localStorage.setItem('isLoggedIn', 'true');
              toast.success(`Login efetuado com sucesso!`, {
              duration: 5000,
              });
              setTimeout(() => {
                window.location.href = '/empresa/geral';
              }, 2000);
            } else if (userFromDB.cargo === 'employee') {
              console.log(userFromDB.cargo);
              login(formData.user, 'employee');
              localStorage.setItem('isLoggedIn', 'true');
              toast.success(`Login efetuado com sucesso!`, {
                duration: 5000,
              });
              setTimeout(() => {
                window.location.href = '/empresa/clients';
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
        }else{
          toast.error('Credenciais inválidas!')
          localStorage.setItem('isLoggedIn', 'false');
        }
      } else {
        toast.error('Utilizador não encontrado!')
        localStorage.setItem('isLoggedIn', 'false');
      }
    }catch(error){
      console.log(error);
    }
  };
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5 }}
  >
    <div className="h-full flex flex-col justify-center items-center pt-24 2xl:pt-40">
      <div className="max-w-md w-full p-4 rounded-md text-black font-bodyfooter">
        <div className="text-2xl font-bold mb-2 text-white text-center">
          Oficina Fernando Costa Fialho <span className="text-[#53AE6E]"><br />Área de Cliente</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-white">Inicie sessão na sua conta</div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="block relative">
            <label className="label-login">Nome de utilizador</label>
            <input
              type="text"
              id="user"
              className="input-login"
              value={user}
              onChange={(e) => setUser (e.target.value)}
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
          <button type="submit" className="bg-body w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
            Entrar
          </button>
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
    </motion.div>
  );
}