import { Link } from "react-router-dom";  
import { LogOut, User, NotepadText } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '@/data/AuthProvider';

export function SideBarClients() {
  const { username, logout } = useContext(AuthContext);
  const logo = new URL("@/public/images/header.png", import.meta.url).href;

  return (
    <div className="text-white top-0 bottom-0 lg:left-0 p-2 w-72 overflow-y-auto text-center bg-[#282828] h-screen font-bodyfooter flex flex-col justify-between">
      <Link to={`/cliente/clientArea`}><img src={logo} alt="Logotipo" /></Link>
      <div className="text-gray-100 text-xl">
        Área de Cliente
        <div className="p-2 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 ml-3">
            {username}
          </h1>
        </div>
        <hr className="my-2"/>
        <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
          <User />
          <Link to="/cliente/clientArea"><span className="text-[15px] ml-4">Geral</span></Link>
        </div>
        <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <NotepadText />
        <Link to="/cliente/clientCarCheck"><span className="text-[15px] ml-4">Agendar Revisão</span></Link>
      </div>
      </div>
      <hr className="my-2"/>
      <div className="mt-auto p-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <LogOut />
        <Link to="/login" onClick={() => logout()}><span className="text-[15px] ml-4">LogOut</span></Link>
      </div>
    </div>
  );
}