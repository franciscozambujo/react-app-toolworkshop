import React from 'react'
import { CreateUser } from '../components/create-user';
import { HeaderMenuNav } from '../components/headerMenu';

export function CreateNewUser () {
  return (
    <div className="bg-slate-800">
      <HeaderMenuNav/>
      <CreateUser/>
    </div>
  );
};