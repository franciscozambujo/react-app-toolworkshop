import React from 'react'
import { EmployeePage } from './components/employeePage-main.tsx';
import { DataTableF } from './components/data-table-invoices.tsx';
/*import { ComboBoxCar } from './components/CarComboBox.tsx'*/
import Redirect from './middlewares/redirect.tsx';
import { HeaderEmployee } from './components/header-employee.tsx';

export const Employee: React.FC = () => {
  return (
    <div>
      <Redirect />
      <HeaderEmployee/>
      <EmployeePage/>
      <DataTableF />
    </div>
  );
};