import React from 'react'
import { employeePage } from './components/employeePage-main.tsx';
import { DataTableF } from './components/data-table-invoices.tsx'
import Redirect from './middlewares/redirect.tsx';

export const Employee: React.FC = () => {
  return (
    <>
      <Redirect />
      <div className="main">
        {employeePage()}
      </div>
      <DataTableF />
    </>
  );
};