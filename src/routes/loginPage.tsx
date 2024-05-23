import { LoginForm } from "../components/loginPage-main";
import { HeaderMenuNav } from "../components/headerMenu";
import { Footer } from "@/components/footer";

export function LoginPage () {
  const imgBg = new URL("@/public/images/oficina_login.png", import.meta.url).href;
  return (
    <div>
        <img
          className="absolute inset-0 z-0"
          src={imgBg}
          alt="Oficina Frente"
        />
        <HeaderMenuNav />
      <div className="relative">
        <LoginForm />
      </div>
    </div>
  )
}