import { MainEmployeePage } from "@/components/empresa/employeePage-main.tsx";
import {Redirect} from "@/data/Redirect";

export function EmployeePage() {
  return (
    <div>
      <Redirect/>
      <MainEmployeePage />
    </div>
  );
}
