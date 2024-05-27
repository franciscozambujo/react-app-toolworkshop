import { LoginForm } from "../components/loginPage-main";
import { HeaderMenuNav } from "../components/headerMenu";

export function LoginPage () {
  
  return (
    <div className="bg-slate-800">
        <HeaderMenuNav />
      <div className="relative">
        <LoginForm />
      </div>
    </div>
  )
}