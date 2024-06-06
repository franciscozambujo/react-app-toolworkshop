import { Button } from "./ui/button"
import { Toaster, toast } from 'sonner'
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';


export function MainPage() {
  const imgRevisao = new URL("@/public/images/give_car_keys.jpg", import.meta.url).href;
  const imgInspecionar = new URL("@/public/images/inspecionar.jpg", import.meta.url).href;
  const imgInstalacoes = new URL("@/public/images/motor.jpg", import.meta.url).href;

  return(
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5 }}
  >
    <div className="flex justify-center">
    <div className="font-bodyfooter m-12 max-w-screen-xl">
      <div className="relative w-1/2 pb-40">
        <img src={imgRevisao} alt="Revisão" className="h-64 float-left mr-10"/>
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">Agende já a sua <br/>Revisão</h2>
            <p className="w-96 font-medium text-base pl-2">
              Com o nosso sistema de agendamento online, reservar a sua revisão auto nunca foi tão fácil. <br />Basta apenas registar-se e pode fazer já o seu agendamento. 
              <br />Depois, basta aguardar pela resposta da oficina.

             </p>
          <Link to="/createuser"><Button className="w-48 h-10 bg-body ml-2">Criar conta gratuitamente</Button></Link>
          </div>
        </div>
        <Toaster richColors/>
      <div className="relative w-1/2 pb-40">
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">Os Nossos <br/> Serviços</h2>
            <p className="w-96 font-medium text-base pl-2">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard  dummy text. Lorem Ipsum is simply dummy text of the printing and  typesetting.</p>
            <img src={imgInspecionar} alt="Revisão" className="h-64 absolute ml-96 float-right"/>
        </div>
      </div>
      <div className="relative w-1/2 pb-40">
        <img src={imgInstalacoes} alt="Revisão" className="h-64 float-left mr-10"/>
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">As Nossas <br/>Instalações</h2>
            <p className="w-96 font-medium text-base pl-2">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard  dummy tex.</p>
          </div>
      </div>
    </div>
    </div>
    </motion.div>
  )
}