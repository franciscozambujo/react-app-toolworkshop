import React from 'react';
import { LoginForm } from "../components/loginPage-main";
import { HeaderMenuNav } from "../components/headerMenu";

export function LoginPage () {
  return (
    <div className="bg-slate-800">
      <HeaderMenuNav />
      <LoginForm />
    </div>
  )
}