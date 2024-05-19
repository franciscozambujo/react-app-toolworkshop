import React from 'react'
import { OwnerPageMain } from '../components/ownerPage-main.tsx';
import { HeaderMenuNav } from '../components/headerMenu.tsx'

export function OwnerPage() {
  return (
    <div>
      <HeaderMenuNav/>
      <OwnerPageMain/> 
    </div>
  );
};