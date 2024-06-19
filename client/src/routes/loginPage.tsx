import { LoginForm } from "../components/loginPage-main";
import { HeaderMenuNav } from "../components/headerMenu";

export function LoginPage () {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#282828]">
          <HeaderMenuNav />
      </div>
      <div className="flex-1 bg-[#181818] overflow-y-auto">
          <LoginForm />
      </div>
  </div>
  )
}