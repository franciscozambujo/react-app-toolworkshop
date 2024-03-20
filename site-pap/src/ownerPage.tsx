import React from 'react'
import { main } from './components/ownerPage-main.tsx';
import { headerMenuNav } from './components/headerMenu.tsx'
import Redirect from './middlewares/redirect.tsx';

export const Owner: React.FC = () => {
  return (
    <>
    <Redirect/>
    <div className="header">
      {headerMenuNav()}
    </div>
    <div className="main">
      {main()}
    </div>    
    </>
  );
};