import React from 'react';
import { UsersLogin } from "../components/loginPage-main";
import { HeaderMenuNav } from "../components/headerMenu";
import { Outlet } from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="bg-slate-800">
      <HeaderMenuNav />
      <UsersLogin />
    </div>
  )
}

export default LoginPage