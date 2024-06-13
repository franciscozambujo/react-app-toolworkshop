import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/usersByRole?user=${username}`
      );
      const data = await response.json();
      const userFromDB = data;
  
      if (userFromDB) {
          try {
            const response = await axios.post('http://localhost:3000/auth/login', { user: username, password: password });
            const { token: tokenReceived } = response.data;
            setToken(tokenReceived);
            localStorage.setItem('token', tokenReceived);
            //console.log(tokenReceived);
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokenReceived}`;
          } catch (error) {
            console.error(error);
          }
          axios.get('http://localhost:3000/token-auth')
          .catch(error => {
              console.error(error);
            });
          try {
            const response = await fetch(
              `http://localhost:3000/usersByRole?user=${username}`
            );
            const data = await response.json();
        
            if (data === 'owner') {
                toast.success(`Login efetuado com sucesso!`, {
                duration: 5000,
              });
              setTimeout(() => {
                window.location.href = '/empresa/geral';
              }, 2000);
            } else if (data === 'employee') {
              toast.success(`Login efetuado com sucesso!`, {
                duration: 5000,
              });
              setTimeout(() => {
                window.location.href = '/empresa/employeepage';
              }, 2000);
            } else if (data === 'client') {
              toast.success(`Login efetuado com sucesso!`, {
                duration: 5000,
              });
              setTimeout(() => {
                window.location.href = '/cliente/clientArea';
              }, 2000);
            }
          } catch (error) {
            console.error(error);
          } 
        }else{
          toast.error(`Credenciais inválidas!`, {
            duration: 5000,
          });
        }
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5 }}
  >
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md flex flex-col p-4 rounded-md text-black font-bodyfooter">
        <div className="text-2xl font-bold mb-2 text-white text-center">
          Oficina Fernando Costa Fialho <span className="text-[#53AE6E]"><br />Área de Cliente</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-white">Inicie sessão na sua conta</div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="block relative">
            <label className="label-login">Username</label>
            <input
              type="text"
              id="user"
              className="input-login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
    </motion.div>
  );
}

function verifyToken(tokenReceived: any) {
  throw new Error('Function not implemented.');
}
