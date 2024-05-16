import React from 'react'
import { CreateUser } from './components/create-user';
import { HeaderMenuNav } from './components/headerMenu';

export const CreateNewUser: React.FC = () => {
  return (
    <div className="bg-slate-800">
      <HeaderMenuNav/>
      <CreateUser/>
    </div>
  );
};