import { Link } from "react-router-dom";
import { User, Wrench, AreaChart, Settings, LogOut, UsersRound, Star } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '@/data/AuthProvider';

export function SideBarEnterprise() {
  const { userRole, username, logout } = useContext(AuthContext);
  const logo = new URL("@/public/images/header.png", import.meta.url).href;
  console.log(userRole)
  console.log(username)

  return (
    <div className="text-white top-0 bottom-0 lg:left-0 p-2 w-72 overflow-y-auto text-center bg-[#282828] h-screen font-bodyfooter flex flex-col justify-between">
    <img src={logo} alt="Logotipo" />
      <div className="text-gray-100 text-xl">
        Gestão de Empresa
        <div className="p-2 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 ml-3">
            {userRole === 'owner'? username : username}
          </h1>
        </div>
        <hr className="my-2"/>
      {userRole === 'owner' && (
        <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
          <AreaChart />
            <Link to ="/empresa/geral"><span className="text-[15px] ml-4">Visão Geral</span></Link>
        </div>
      )}
      <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <User />
        <Link to="/empresa/clients"><span className="text-[15px] ml-4">Clientes</span></Link>
      </div>
      <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <Wrench />
        <Link to="/empresa/carRepairs"><span className="text-[15px] ml-4">Reparações/Revisões</span></Link>
      </div>
      {userRole === 'owner' && (
      <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <UsersRound />
        <Link to="/empresa/allusers"><span className="text-[15px] ml-4">Utilizadores/Avaliações</span></Link>
      </div>
      )}
      </div>
      <hr className="my-4"/>
      <div className="mt-auto mb-2 p-2 flex bottom-0 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <LogOut />
        <Link to="/login" onClick={() => logout()}><span className="text-[15px] ml-4">LogOut</span></Link>
      </div>
    </div>
  );
}