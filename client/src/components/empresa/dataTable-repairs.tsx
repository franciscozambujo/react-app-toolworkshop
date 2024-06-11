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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import debounce from 'lodash.debounce';
import { Calendar } from "../ui/calendar";
import React from "react";
import { toast, Toaster } from "sonner";

export function DataTableR() {
  const [allInvoices, setAllInvoices] = useState<any[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
  const [matriculas, setMatriculas] = useState<any[]>([]);
  const [selectedMatricula, setSelectedMatricula] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [searchInput, setSearchInput] = useState('');
  const rowsPerPage = 10;
  const [data, setData] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = Math.floor(startIndex / rowsPerPage) + 1;
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

  const debouncedFetchRepairs = debounce(async (searchInput: string) => {
    console.log(searchInput);
    try {
      const response = await fetch(`${API_URL}/repairs?searchRepairs=${searchInput}`);
      const data = await response.json();
      if (data.length === 0) {
        setFilteredInvoices([]);
      } else {
        setFilteredInvoices(data);
      }
      console.log(data);
    } catch (error) {
      console.error('Error fetching repairs:', error);
    }
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    setSearchInput(searchInput);
    if (searchInput!== '') {
      debouncedFetchRepairs(searchInput);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
    event.preventDefault();
    const formData = {
      plate: (event.target as HTMLFormElement).matricula.value,
      description: (event.target as HTMLFormElement).descricao.value,
      value: (event.target as HTMLFormElement).valor.value,
      date: formattedDate,
    };

    if (formData.plate === "Nenhuma matrícula encontrada"){
      toast.error('Introduza um nome de cliente válido para aparecer uma matricula.'); 
      return;
    }

    const today = new Date();
    if (new Date(formData.date) > today){
      toast.error('Introduza uma data válida.'); 
      return;
    }

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
    toast.success(`Reparação criada com sucesso!`)
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/invoices`);
        const data = await response.json();
        setAllInvoices(data);
        setData(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handlePagination = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (endIndex < data.length) {
        setStartIndex(startIndex + rowsPerPage);
        setEndIndex(endIndex + rowsPerPage);
      }
    } else {
      if (startIndex > 0) {
        setStartIndex(startIndex - rowsPerPage);
        setEndIndex(endIndex - rowsPerPage);
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl space-y-4 m-auto">
      <div className="flex items-center justify-between">
        <form className="flex items-center gap-8">
          <Input
            value={searchInput}
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
                  className="col-span-3 select uppercase"
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
                <textarea
                  id="descricao"
                  name="descricao"
                  required
                  placeholder="Mudança de óleo, troca de pastilhas etc."
                  className="col-span-3 flex h-36 max-h-36 min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
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
      <TableHead className="w-[200px]">Nome do Cliente</TableHead>
      <TableHead>Veículo</TableHead>
      <TableHead className="w-[130px]">Matrícula</TableHead>
      <TableHead>Descrição</TableHead>
      <TableHead className="w-[80px]">Valor</TableHead>
      <TableHead>Data</TableHead>
    </TableRow>
  </TableHeader>
  {searchInput === '' ? (
    allInvoices.length > 0 ? (
      <TableBody>
        {data.slice(startIndex, endIndex).map((invoice) => (
          <TableRow key={invoice.id} className="hover:bg-muted/50">
            <TableCell>{invoice.cliente}</TableCell>
            <TableCell>{invoice.veiculo}</TableCell>
            <TableCell className="uppercase">{invoice.matricula}</TableCell>
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
            <TableCell className="w-28">{format(new Date(invoice.data), 'dd-MM-yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    ) : (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} align="center">Nenhum registro encontrado</TableCell>
        </TableRow>
      </TableBody>
    )
  ) : (
    filteredInvoices.length > 0 ? (
      <TableBody>
        {filteredInvoices.map((invoice) => (
          <TableRow key={invoice.id} className="hover:bg-muted/50">
            <TableCell>{invoice.nome}</TableCell>
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
            <TableCell className="w-28">{format(new Date(invoice.data), 'dd-MM-yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    ) : (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} align="center">Nenhum registro encontrado</TableCell>
        </TableRow>
      </TableBody>
    )
  )}
</Table>
      </div>
      <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePagination('prev')} 
                />
            </PaginationItem>
            <PaginationItem>
              <span>
                Página {currentPage} de {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePagination('next')} 
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      <Toaster richColors/>
    </div>
  )
}