import { Button } from "./ui/button"

export function MainPage() {
  const imgRevisao = new URL("@/public/images/give_car_keys.jpg", import.meta.url).href;
  const imgInspecionar = new URL("@/public/images/inspecionar.jpg", import.meta.url).href;
  const imgInstalacoes = new URL("@/public/images/motor.jpg", import.meta.url).href;

  return(
    <div className="font-bodyfooter m-12">
      <div className="relative left-1/4 w-1/2 pb-40">
        <img src={imgRevisao} alt="Revisão" className="h-64 float-left mr-10"/>
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">Agende já a sua <br/>Revisão</h2>
            <p className="w-96 font-medium text-base pl-2">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard  dummy tex.</p>
            <Button className="w-20 h-14 bg-body ml-2">Agendar</Button>
          </div>
        </div>
      <div className="relative left-1/4 w-1/2 pb-40">
        <img src={imgInspecionar} alt="Revisão" className="h-64 float-right -mr-44"/>
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">Os Nossos <br/> Serviços</h2>
            <p className="w-96 font-medium text-base pl-2">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard  dummy text. Lorem Ipsum is simply dummy text of the printing and  typesetting.</p>
        </div>
      </div>
      <div className="relative left-1/4 w-1/2 pb-40">
        <img src={imgInstalacoes} alt="Revisão" className="h-64 float-left mr-10"/>
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">As Nossas <br/>Instalações</h2>
            <p className="w-96 font-medium text-base pl-2">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard  dummy tex.</p>
          </div>
      </div>
    </div>
  )
}