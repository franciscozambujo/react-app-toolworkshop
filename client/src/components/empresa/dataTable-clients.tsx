import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast, Toaster } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

export function DataTableC() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [searchClients, setSearchedClients] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCarDialogOpen, setIsCarDialogOpen] = useState(false);
  const [filteredClients, setfilteredClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const rowsPerPage = 10;
  const [data, setData] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = Math.floor(startIndex / rowsPerPage) + 1;
  const API_URL = "http://localhost:3000";

  const debouncedFetchClients = debounce(async (searchClients: string) => {
    console.log(searchClients);
    try {
      const response = await fetch(`${API_URL}/clientsByName?searchClients=${searchClients}`);
      const data = await response.json();
      if (data.length === 0) {
        setfilteredClients([]);
      } else {
        setfilteredClients(data);
      }
      console.log(filteredClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }, 100);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchClients = e.target.value;
    setSearchedClients(searchClients);
    if (searchClients !== "") {
      debouncedFetchClients(searchClients);
    }
  };

  const handleClientSelect = (client: any) => {
    setSelectedClient(client);
    setSelectedClientId(client.id);
    debouncedFetchCarsByClient(client.id);
    setIsCarDialogOpen(true);
  };

  const debouncedFetchCarsByClient = debounce(async (clientId: number) => {
    try {
      const response = await fetch(`${API_URL}/carsByClient?clientID=${clientId}`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  },100);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      carBrand: (event.target as HTMLFormElement).carBrand.value,
      carModel: (event.target as HTMLFormElement).carModel.value,
      carPlate: (event.target as HTMLFormElement).carPlate.value,
      clientEmail: (event.target as HTMLFormElement).clientID.value,
    };
    const plateUpper = formData.carPlate.toUpperCase();
      try{
        const searchResponseChecks = await fetch(`${API_URL}/vehicles`);
        const searchDataChecks = await searchResponseChecks.json();
        const encontrado = searchDataChecks.some((item: { id: number, marca: string, modelo: string, matricula: string, cliente: number })  => item.matricula === plateUpper);
  
        if (encontrado) {
          toast.error(`Essa matricula já existe.`, {
            duration: 3500,
          });
          return;
        }
      }catch(error) {
        console.error("Check error fetching:", error);
      }

    fetch(`${API_URL}/createCarClientByEmail`, {
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
    toast.success(`Carro adicionado ao cliente!`)
    setTimeout(() => {
    }, 1500);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setClients(data);
        setData(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });

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

  const handleDeleteCar = async (clientId: any, carPlate:any) => {
    try {
      const response = await fetch(`${API_URL}/deleteCar/${clientId}/${carPlate}`, {
        method: 'DELETE',
      });
      console.log(data);
      setCars(cars.filter((c) => c.id !== clientId));
      setIsCarDialogOpen(false);
      toast.success(`Carro eliminado com sucesso!`);
    } catch (error) {
      console.error(`Error deleting car: ${error}`);
      toast.error(`Erro ao eliminar veículo. Tente novamente.`);
    }
  };
  return (
    <div className="p-8 max-w-5xl space-y-4 m-auto">
      <div className="flex items-center justify-between">
        <form className="flex items-center gap-8">
          <Input
            value={searchClients}
            onChange={handleSearchChange}
            id="search"
            placeholder="Pesquisar Dados"
          />
        </form>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00865A] font-bodyfooter">Adicionar carros a um cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar veículos a um cliente</DialogTitle>
              <DialogDescription>Preencha os campos necessários.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-4 items-center text-right gap-5">
                <Label>Cliente</Label>
                <select
                className="col-span-3 select"
                name="clientID"
                id="clientID"
                required
                >
                  {clients.map((client) => (                    
                    <option key={client.id} value={client.email}>
                      {client.nome}
                    </option>
                  ))}
                </select>
                <Label>Marca</Label>
                <Input 
                className="col-span-3"
                type="text"
                placeholder="Mercedes"
                id="carBrand"
                name="carBrand"
                required />
                <Label>Modelo</Label>
                <Input 
                className="col-span-3"
                placeholder="C200D"
                id="carModel" 
                name="carModel"
                required />
                <Label>Matrícula</Label>
                <Input 
                className="col-span-3"
                placeholder="AA-00-AA"
                id="carPlate" 
                name="carPlate"
                required />
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
    <TableCell>Nome</TableCell>
    <TableCell>Telemóvel</TableCell>
    <TableCell>Email</TableCell>
    <TableCell>Veículos</TableCell>
  </TableHeader>
  {searchClients !== "" && filteredClients.length > 0 ? (
    <TableBody>
      {filteredClients.map((client) => (
        <TableRow key={client.id} className="hover:bg-muted/50">
          <TableCell>{client.nome}</TableCell>
          <TableCell>{client.telemovel}</TableCell>
          <TableCell>{client.email}</TableCell>
          <TableCell>
            <Dialog open={selectedClient?.id === client.id && isCarDialogOpen} onOpenChange={setIsCarDialogOpen}>
              <DialogTrigger>
                <button onClick={() => handleClientSelect(client)}>
                  Clique para ver os veículos
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Veículos registados</DialogTitle>
                </DialogHeader>
                {cars.length > 0 ? (
                  <ul>
                    {cars.map((car) => (
                      <li key={car.id} className="pb-2">
                        {car.marca} {car.modelo} | <span className="uppercase pr-8">{car.matricula}</span>
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteCar(client.id, car.matricula)}
                        >
                          Eliminar veículo
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  ) : (
    <TableBody>
      {data.slice(startIndex, endIndex).map((client) => (
        <TableRow key={client.id} className="hover:bg-muted/50">
          <TableCell>{client.nome}</TableCell>
          <TableCell>{client.telemovel}</TableCell>
          <TableCell>{client.email}</TableCell>
          <TableCell>
            <Dialog open={selectedClient?.id === client.id && isCarDialogOpen} onOpenChange={setIsCarDialogOpen}>
              <DialogTrigger>
                <button onClick={() => handleClientSelect(client)}>
                  Clique para ver os veículos
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Veículos registados</DialogTitle>
                </DialogHeader>
                {cars.length > 0 ? (
                  <ul>
                    {cars.map((car) => (
                      <li key={car.id} className="pb-2">
                        {car.marca} {car.modelo} | <span className="uppercase pr-8">{car.matricula}</span>
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteCar(client.id, car.matricula)}
                        >
                          Eliminar veículo
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
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
  );
}