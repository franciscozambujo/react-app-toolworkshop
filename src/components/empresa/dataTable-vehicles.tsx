import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import debounce from 'lodash.debounce';
import { Calendar } from "../ui/calendar";
import React from "react";

export function DataTableV() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [matriculas, setMatriculas] = useState<any[]>([]);
  const [selectedMatricula, setSelectedMatricula] = useState('');
  const [searchRepairs, setRepairs] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const API_URL = "http://localhost:3000";

  const debouncedFetchMatriculas = debounce(async (nomeCliente: string) => {
    try {
      const response = await fetch(`${API_URL}/carPlate?nomeCliente=${nomeCliente}`);
      const data = await response.json();
      setMatriculas(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching matriculas:', error);
    }
  }, 500);

  const handleNomeClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nomeCliente = e.target.value;
    setNomeCliente(nomeCliente);
    setMatriculas([]);
    debouncedFetchMatriculas(nomeCliente);
  };

  const debouncedFetchRepairs = debounce(async (searchRepairs: string) => {
    try {
      const response = await fetch(`${API_URL}/repairs?searchRepairs=${searchRepairs}`);
      const data = await response.json();
      setInvoices(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching repairs:', error);
    }
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchRepairs = e.target.value;
    setRepairs(searchRepairs);
    if (searchRepairs !== '') {
      debouncedFetchRepairs(searchRepairs);
    }
  };

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      plate: (event.target as HTMLFormElement).matricula.value,
      description: (event.target as HTMLFormElement).descricao.value,
      value: (event.target as HTMLFormElement).valor.value,
      date: formattedDate,
    };

    fetch(`${API_URL}/createCarRepairs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(`Error creating repair: ${error}`));
    setIsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/invoices');
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchRepairs]);

  return (
    <div className="p-8 max-w-5xl space-y-4 m-auto">
      <div className="flex items-center justify-between">
        <form className="flex items-center gap-8">
          <Input
            value={searchRepairs}
            onChange={handleSearchChange}
            id="search"
            placeholder="Pesquisar Dados"
          />
        </form>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00865A] font-bodyfooter">Nova Reparação</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Reparação</DialogTitle>
              <DialogDescription>Preencha os campos necessários.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-4 items-center text-right gap-5">
                <Label>Nome do Cliente</Label>
                <Input
                  className="col-span-3"
                  type="text"
                  value={nomeCliente}
                  onChange={handleNomeClienteChange}
                  placeholder="Francisco"
                  id="nome"
                  name="nome"
                  required
                />
                <Label>Matrícula</Label>
                <select
                  value={selectedMatricula}
                  onChange={(e) => setSelectedMatricula(e.target.value)}
                  className="col-span-3 select"
                  name="matricula"
                  id="matricula"
                  required
                >
                  {Array.isArray(matriculas) && matriculas.length > 0 ? (
                    matriculas.map((matricula) => (
                      <option key={matricula.id} value={matricula.matricula}>
                        {matricula.matricula}
                      </option>
                    ))
                  ) : (
                    <option>Nenhuma matrícula encontrada</option>
                  )}
                </select>
                <Label>Descrição</Label>
                <Input className="col-span-3" id="descricao" name="descricao" required />
                <Label>Valor</Label>
                <Input type="number" className="col-span-3" id="valor" name="valor" required />
                <Calendar
                  className="col-span-2 pl-28 w-3/6"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  required
                  initialFocus
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#00865A]">Criar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[130px]">Nome do Cliente</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead className="w-[130px]">Matrícula</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[150px]">Valor</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          {invoices.length > 0 || searchRepairs === '' ? (
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.cliente}</TableCell>
                  <TableCell>{invoice.veiculo}</TableCell>
                  <TableCell>{invoice.matricula}</TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <button><TableCell className="line-clamp-1">{invoice.descricao}</TableCell></button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Descrição da Reparação
                        </DialogTitle>
                      </DialogHeader>
                      {invoice.descricao}
                    </DialogContent>
                  </Dialog>
                  <TableCell>{invoice.valor}€</TableCell>
                  <TableCell className="w-24">{format(new Date(invoice.data), 'dd-MM-yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhum registro encontrado</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  )
}