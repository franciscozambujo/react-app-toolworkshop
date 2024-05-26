import { MainEmployeePage } from '../components/employeePage-main.tsx';
import { HeaderEnterprise } from '../components/header-enterprise.tsx';

export function EmployeePage (){
  return (
    <div>
      <HeaderEnterprise/>
      <MainEmployeePage/>
    </div>
  );
};