import {Link } from "react-router-dom"

export function HeaderMenuNav() {
  const imgHeader = new URL("@/public/images/header_branco.png", import.meta.url).href;
  return (
    <div className="bg-transparent h-16 grid content-center font-bodyfooter text-white py-2 z-0">
      <Link className="absolute max-w-60 max-h-60 -mt-5" to ="/"><img src={imgHeader} alt="Logotipo"/></Link>
      <div className="text-lg hover:font-bold absolute left-auto right-6 m-2">
        <Link to = "/login">
            Login
        </Link>
      </div>
    </div>
  );
}