import { Button } from "./ui/button"
import React from "react"
import { Input } from "@/components/ui/input"


export function UsersLogin() {
  return (
    <div className="h-screen flex items-center justify-center">
    <div className="max-w-md flex flex-col p-4 rounded-md text-black font-bodyfooter">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Oficina Fernando Costa Fialho <span className="text-[#53AE6E]"><br />Área do Cliente</span></div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Inicie sessão na sua conta</div>
          <form className="flex flex-col gap-3">
              <div className="block relative"> 
                <label className="label-login">Email</label>
                <Input type="text" id="email" className="input-login"/>
                <label className="label-login mt-6">Password</label>
                <Input type="password" id="password" className="input-login"/>
              </div>
              <a className="text-sm text-[#53AE6E]" href="#">Esqueceu-se da password?</a>
              <Button type="submit" className="bg-body w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Entrar</Button>
          </form>
      <div className="text-sm text-center mt-[1.6rem]">
      Não tem uma conta? 
      <a className="text-sm text-[#53AE6E]" href="../create-user.html">Registe-se aqui gratuitamente!!</a></div>
      </div>
    </div>
  );
}
