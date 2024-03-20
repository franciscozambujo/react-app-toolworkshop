import React from 'react'
import { employeePage } from './components/employeePage-main.tsx';
import { headerMenuNav } from './components/headerMenu.tsx';
import Redirect from './middlewares/redirect.tsx';

export const Employee: React.FC = () => {
  return (
    <>
      <Redirect />
      <div className="header">
        {headerMenuNav()}
      </div>
      <div className="main">
        {employeePage()}
      </div>
    </>
  );
};