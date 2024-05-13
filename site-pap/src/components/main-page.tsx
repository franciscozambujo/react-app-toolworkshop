import { useState } from "react";
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import React from "react";

export function MainPage() {
  const imgRevisao = new URL("@/public/images/give_car_keys.jpg", import.meta.url).href;
  const imgInspecionar = new URL("@/public/images/inspecionar.jpg", import.meta.url).href;
  const imgInstalacoes = new URL("@/public/images/motor.jpg", import.meta.url).href;

  const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {    
    event.preventDefault();
    const formData = {
      name: (event.target as HTMLFormElement).nome.value,
      phone: (event.target as HTMLFormElement).numerotel.value,
      car: (event.target as HTMLFormElement).carro.value,
      plate: (event.target as HTMLFormElement).matricula.value,
      checkDate: formattedDate ,
    };

    console.log(formData.name);
    console.log(formData.phone);
    console.log(formData.car);
    console.log(formData.plate);
    console.log(formData.checkDate);
    
    fetch(`http://localhost:3000/createCarChecks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(`Error creating carCheck: ${error}`));
    setIsOpen(false);
  }

  return(
    <div className="font-bodyfooter m-12 max-w-screen-xl">
      <div className="relative left-1/3 w-1/2 pb-40">
        <img src={imgRevisao} alt="Revisão" className="h-64 float-left mr-10"/>
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">Agende já a sua <br/>Revisão</h2>
            <p className="w-96 font-medium text-base pl-2">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard  dummy tex.</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
          <Button className="w-36 h-10 bg-body ml-2">Agende a revisão</Button>
          </DialogTrigger>
          <DialogContent className="font-bodyfooter">
            <DialogHeader>
              <DialogTitle>Agendar Revisão</DialogTitle>
              <DialogDescription>
                Preencha os campos necessários.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-4 items-center text-right gap-2">
                <Label>Nome</Label>
                <Input
                  className="col-span-3"
                  id="nome"
                  type="text"
                  placeholder="Ex: João"
                  required
                />
                <Label>Número de telemóvel</Label>
                <Input
                  className="col-span-3"
                  id="numerotel"
                  type="text"
                  pattern="[0-9]{9}"
                  placeholder="Ex: 964320345"
                  required
                />
                <Label>Modelo do carro</Label>
                <Input
                  className="col-span-3"
                  id="carro"
                  type="text"
                  placeholder="Ex: Mercedes C220"
                  required
                />
                <Label>Matrícula do carro</Label>
                <Input
                  className="col-span-3"
                  id="matricula"
                  type="text"
                  placeholder="Ex: 09-32-HS"
                  required
                />
                <Calendar
                  className="col-span-2"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  required
                  initialFocus
                />
              </div>
              <DialogFooter>
                <Button type="submit" id="submitReview" className="bg-body">
                  Submeter
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
          </div>
        </div>
      <div className="relative left-1/3 w-1/2 pb-40">
        <img src={imgInspecionar} alt="Revisão" className="h-64 float-right -mr-44"/>
        <div className="grid grid-rows-1 gap-2 row-span-3 self-center">
          <div className="w-20 origin-top-left rotate-[90deg] border-4 border-body"/>
            <h2 className="text-body text-3xl font-bold pl-2 -mt-2">Os Nossos <br/> Serviços</h2>
            <p className="w-96 font-medium text-base pl-2">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard  dummy text. Lorem Ipsum is simply dummy text of the printing and  typesetting.</p>
        </div>
      </div>
      <div className="relative left-1/3 w-1/2 pb-40">
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