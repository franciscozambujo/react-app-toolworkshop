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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export function DataTableC() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [searchClients, setSearchedClients] = useState("");
  const [isCarDialogOpen, setIsCarDialogOpen] = useState(false);
  const API_URL = "http://localhost:3000";

  const debouncedFetchClients = debounce(async (searchClients: string) => {
    console.log(searchClients);
    try {
      const response = await fetch(`${API_URL}/clientsByName?searchClients=${searchClients}`);
      const data = await response.json();
      setClients(data);
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
    debouncedFetchCarsByClient(client.id);
    setIsCarDialogOpen(true);
  };

  const debouncedFetchCarsByClient = debounce(async (clientId: number) => {
    console.log(clientId);
    try {
      const response = await fetch(`${API_URL}/getCarsByClient?clientID=${clientId}`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  },100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/clients`);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchClients]);

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
      </div>
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[130px]">Nome de cliente</TableHead>
              <TableHead className="w-[130px]">Número de telemóvel</TableHead>
              <TableHead className="w-[150px]">Email</TableHead>
              <TableHead className="w-[150px]">Veículo/s registados</TableHead>
            </TableRow>
          </TableHeader>
          {clients.length > 0 ? (
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50">
                  <TableCell>{client.nome}</TableCell>
                  <TableCell>{client.telemovel}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <Dialog open={selectedClient?.id === client.id && isCarDialogOpen} onOpenChange={setIsCarDialogOpen}>
                    <DialogTrigger>
                      <button onClick={() => handleClientSelect(client)}>
                        <TableCell className="line-clamp-1">
                          Clique para ver os veículos
                        </TableCell>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Veículos registados</DialogTitle>
                      </DialogHeader>
                      {cars.length > 0 ? (
                      <ul>
                        {cars.map((car) => (
                          <li key={car.id}>{car.marca} {car.modelo}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Este cliente não tem carros registados.</p>
                    )}
                      </DialogContent>
                    </Dialog>
                  </TableRow>
              ))}
              </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Nenhum registo encontrado
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          </Table>
        </div>
      </div>
  );
}