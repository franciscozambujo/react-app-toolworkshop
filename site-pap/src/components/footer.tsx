import {Phone, Mail, MapPin, Clock3} from 'lucide-react'
import {FaGithub, FaLinkedin} from "react-icons/fa";

export function Footer() {
  const logo = new URL("@/public/images/logo.png", import.meta.url).href;
  return (
    <div className="bg-[#53AE6E] text-white w-full font-bodyfooter">
      <div className="flex justify-between px-52 md:px-48">
        <div>
          <img src={logo} alt="LogoTipo" className="py-2 w-28"/>
          <div className="grid grid-flow-col auto-cols-max">
            <Phone className="-ml-0.5" />
            <p className="px-2">+351 266 707 212</p>
          </div>
          <div className="grid grid-flow-col auto-cols-max">
            <Mail className="-ml-0.5" />
            <p className="px-2">fernandofialho@gmail.com</p>
          </div>
          <div className="grid grid-flow-col auto-cols-max">
            <MapPin className="-ml-0.5" />
            <p className="px-2">Zona Industrial Talhão 22, 7000-302, Évora</p>
          </div>
        </div>
        <div>
          <p className="font-bold py-2 text-2xl">HORÁRIO</p>
          <div className="grid grid-flow-col auto-cols-max">
            <Clock3 className="-ml-0.5 size-10"/>
            <p className="px-2">8:30 - 12:30 <br /> 14:30 - 18:30</p>
          </div>
          <button className="underline underline-offset-4 pt-2 bg-transparent hover:font-bold" onClick={() => (window.location.href = "../privacy.html")}>
            Privacy Policy
          </button>
          <br/>
          <button className="underline underline-offset-4 bg-transparent hover:font-bold" onClick={() => (window.location.href = "../Terms.html")}>
            Terms & Conditions
          </button>
        </div>
      </div>
      <hr className="m-auto mt-4 mb-4 border-[#E1DACB] w-4/5"/>
      <div className="py-2">
        <div className="text-center">
          <p>Copyright 2024. Made with ❤ by Francisco Zambujo.</p>
        </div>
        <div className="flex justify-end -mt-5 px-52 md:px-48">
          <a href = "https://www.linkedin.com/in/francisco-zambujo-189764280/" target="_blank"> <FaLinkedin className="size-6 hover:border-2 rounded-md"/></a>
          <a href = "https://github.com/XiCO144" target="_blank"> <FaGithub className="size-6 hover:border-2 rounded-md"/></a>
        </div>
      </div>
    </div>
  );
}