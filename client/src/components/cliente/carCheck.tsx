import {useContext, useEffect, useState } from "react"
import * as React from 'react'
import {Toaster, toast} from 'sonner'
import { addDays, format } from "date-fns"
import { pt } from "date-fns/locale"
import { Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } from "../ui/dialog"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Calendar } from "../ui/calendar"
import { AuthContext } from "@/data/AuthProvider"

export function CarCheck() {
  const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchDataChecks, setSearchDataChecks] = useState<any[]>([]);
  const API_URL = "http://localhost:3000";
  const { username } = useContext(AuthContext);
  
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: username,
      phone: (event.target as HTMLFormElement).numerotel.value,
      car: (event.target as HTMLFormElement).carro.value,
      plate: (event.target as HTMLFormElement).matricula.value,
      checkDate: formattedDate ,
    };

    try{
      useEffect(() => {
        const fetchData = async () => {
          try {
            const searchResponseChecks = await fetch(`${API_URL}/carChecksByUser?user=${formData.name}`);
            const searchDataChecks = await searchResponseChecks.json();
            setSearchDataChecks(searchDataChecks);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, [formData.name]);
      

      const dataAgendadaCom30Dias = addDays(searchDataChecks[0].data_agendada, 30);
      if (new Date(formData.checkDate) < dataAgendadaCom30Dias){
        toast.error(`Já existe uma revisão agendada em seu nome. Consulte as suas revisões agendadas.`, {
          duration: 3500,
        });
        return;
      }

    }catch(error) {
      console.error("Check error fetching:", error);
    }

    const today = new Date();
    const oneWeekFromToday = new Date(today.setDate(today.getDate() + 7));
    if (new Date(formData.checkDate) < oneWeekFromToday) {
      toast.error(`Só pode agendar uma revisão apartir de dia ${format(oneWeekFromToday, 'dd')} de ${format(oneWeekFromToday, 'MMMMMM', { locale: pt })}!`, {
        duration: 2000,
      });
      return;
    }
    try {
        fetch(`${API_URL}/createCarChecks`, {
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
        toast.success(`A revisão foi agendada com sucesso! Aguarde uma resposta pela oficina.`, {
          duration: 3500,
        });
        setIsOpen(false);
      } catch (error) {
        console.error("Error fetching car information:", error);
      }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResponseChecks = await fetch(`${API_URL}/carChecksByUser?user=${username}`);
        const searchDataChecks = await searchResponseChecks.json();
        setSearchDataChecks(searchDataChecks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
    return (
      <div className="p-8 max-w-5xl space-y-4 m-auto">
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

    <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[130px]">Nome de cliente</TableHead>
              <TableHead className="w-[130px]">Número de telemóvel</TableHead>
              <TableHead className="w-[150px]">Carro</TableHead>
              <TableHead className="w-[150px]">Matrícula</TableHead>
              <TableHead className="w-[150px]">Data agendada</TableHead>
              <TableHead className="w-[150px]">Estado da revisão</TableHead>            
            </TableRow>
          </TableHeader>
          {searchDataChecks.length > 0 && (
            <TableBody>
              {searchDataChecks.map((checkData) => (
                <TableRow key={checkData.id} className="hover:bg-muted/50">
                  <TableCell>{checkData.nome_cliente}</TableCell>
                  <TableCell>{checkData.numero_tele}</TableCell>
                  <TableCell>{checkData.carro}</TableCell>
                  <TableCell>{checkData.matricula}</TableCell>
                  <TableCell>{format(new Date(checkData.data_agendada), 'dd-MM-yyyy')}</TableCell>
                  <TableCell>{checkData.estado}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          )}
          </Table>
          </div>
          <Toaster richColors/>
      </div>
  );
}