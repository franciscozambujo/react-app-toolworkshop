import React from 'react'
import { OwnerPage } from './components/ownerPage-main.tsx';
import { HeaderMenuNav } from './components/headerMenu.tsx'
import Redirect from './middlewares/redirect.tsx';

export const Owner: React.FC = () => {
  return (
    <div>
      <Redirect/>
      <HeaderMenuNav/>
      <OwnerPage/> 
    </div>
  );
};