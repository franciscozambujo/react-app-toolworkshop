import { LoginForm } from "../components/loginPage-main";
import { HeaderMenuNav } from "../components/headerMenu";

export function LoginPage () {
  return (
    <div>
      <div className="bg-[#282828]">
          <HeaderMenuNav />
      </div>
      <div className="bg-[#181818]">
          <LoginForm />
      </div>
    </div>
  )
}