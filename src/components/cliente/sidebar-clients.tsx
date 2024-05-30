import { Link } from "react-router-dom";  
import { Settings, LogOut, User } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '@/data/AuthContext';

export function SideBarClients() {
  const { userRole } = useContext(AuthContext);
  const logo = new URL("@/public/images/header.png", import.meta.url).href;
  return (
    <div className="text-white top-0 bottom-0 lg:left-0 p-2 w-72 overflow-y-auto text-center bg-[#282828] h-screen font-bodyfooter flex flex-col justify-between">
      <Link to = {`/cliente/${userRole}page`}><img src={logo} alt="Logotipo" /></Link>
      <div className="text-gray-100 text-xl">
        Área de Cliente
        <div className="p-2 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 ml-3">
            Cliente
          </h1>
        </div>
        <hr className="my-2"/>
        <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <User />
        <Link to="./"><span className="text-[15px] ml-4">teste</span></Link>
      </div>
      </div>
      <hr className="my-4"/>
      <div className="mt-auto p-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <Settings />
        <Link to="/cliente/clientSettings"><span className="text-[15px] ml-4">Definições de conta</span></Link>
      </div>
      <div className="mt-2 mb-2 p-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <LogOut />
        <span className="text-[15px] ml-4">LogOut</span>
      </div>
    </div>
  );
}