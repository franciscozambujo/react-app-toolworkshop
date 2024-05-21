import React from 'react'
import { MainEmployeePage } from '../components/employeePage-main.tsx';
import { DataTableR } from '../components/data-table-repairs.tsx';
import { HeaderEnterprise } from '../components/header-enterprise.tsx';

export function EmployeePage (){
  return (
    <div>
      <HeaderEnterprise/>
      <MainEmployeePage/>
      <DataTableR />
    </div>
  );
};