import {useState } from "react"
import * as React from 'react'
import {Toaster, toast} from 'sonner'
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Calendar } from "../ui/calendar"

export function CarCheck() {
  const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const API_URL = "http://localhost:3000";
  
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

    const today = new Date();
    const oneWeekFromToday = new Date(today.setDate(today.getDate() + 7));
    if (new Date(formData.checkDate) < oneWeekFromToday) {
      toast.error(`Só pode agendar uma revisão apartir de dia ${format(oneWeekFromToday, 'dd')} de ${format(oneWeekFromToday, 'MMMMMM', { locale: pt })}!`, {
        duration: 2000,
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/carsByInfo?name=${formData.name}`);
      const data = await response.json();

      console.log(data[0].marca);
      console.log(data[0].matricula);
      console.log(formData.car);
      console.log(formData.plate );
      
      if (
        data.length > 0 &&
        data[0].marca === formData.car &&
        data[0].matricula === formData.plate

      ) {
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
        toast.success(`A revisão foi agendada com sucesso! Aguarde um contacto pela empresa.`, {
          duration: 2000,
        });
      } else {
        console.warn("Car information mismatch. Display error message.");
      }
    } catch (error) {
      console.error("Error fetching car information:", error);
    }

    /*console.log(formData.name);
    console.log(formData.phone);
    console.log(formData.car);
    console.log(formData.plate);
    console.log(formData.checkDate);*/
  }
    return (
      <div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
          <Button className="w-32 h-10 bg-body ml-2">Agendar revisão</Button>
          </DialogTrigger>
          <DialogContent className="font-bodyfooter">
            <DialogHeader>
              <DialogTitle>Agendar Revisão</DialogTitle>
              <DialogDescription>
                Preencha os campos necessários.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-4 items-center text-right gap-4 md:gap-2">
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
                  className="col-span-3 uppercase"
                  id="matricula"
                  type="text"
                  placeholder="Ex: 09-32-HS"
                  required
                />
                <Calendar
                  className="col-span-2 pl-28"
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
        <Toaster richColors/>
      </div>
  );
}