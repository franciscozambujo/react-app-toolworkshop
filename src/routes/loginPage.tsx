import { LoginForm } from "../components/loginPage-main";
import { HeaderMenuNav } from "../components/headerMenu";
import { Footer } from "@/components/footer";

export function LoginPage () {
  const imgBg = new URL("@/public/images/oficina_login.png", import.meta.url).href;
  return (
    <div>
      <div className="absolute inset-0 z-0">
        <img
          className="object-cover"
          src={imgBg}
          alt="Oficina Frente"
        />
      </div>
        <HeaderMenuNav />
      <div className="relative">
        <LoginForm />
      </div>
    </div>
  )
}