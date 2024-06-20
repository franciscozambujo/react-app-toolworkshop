import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/data/AuthProvider";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";

export function ClientsAreaMain() {
  const [clientID, setClientID] = useState(null);
  const [cars, setCars] = useState<any[]>([]);
  const [repairs, setRepairs] = useState<any[]>([]);
  const { username } = useContext(AuthContext);
  const API_URL = "http://localhost:3000";

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResponseChecks = await fetch(`${API_URL}/usersByuser?user=${username}`);
        const searchDataChecks = await searchResponseChecks.json();
        setClientID(searchDataChecks[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [username]);
    
  useEffect(() => {
    if (clientID) {
      const fetchData = async () => {
        try {
          const searchResponseChecks = await fetch(`${API_URL}/repairsByClientID?clientID=${clientID}`);
          const searcedhRepairs = await searchResponseChecks.json();
          setRepairs(searcedhRepairs);
          console.log(searcedhRepairs);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [clientID]);

  useEffect(() => {
    if (clientID) {
      const fetchData = async () => {
        try {
          const searchResponseChecks = await fetch(`${API_URL}/carsByClient?clientID=${clientID}`);
          const searchedCars = await searchResponseChecks.json();
          setCars(searchedCars);
          console.log(searchedCars);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [clientID]);

  return (
    <div className="flex items-center justify-around pt-24">
      <div>
        <h1 className="text-2xl pb-8">Reparações registadas</h1>
        <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[110px]">Carro</TableHead>
              <TableHead className="w-[110px]">Matricula</TableHead>
              <TableHead className="w-[110px]">Descrição</TableHead>
              <TableHead className="w-[110px]">Valor</TableHead>
              <TableHead className="w-[110px]">Data</TableHead>
            </TableRow>
          </TableHeader>
          {repairs.length > 0 ? (
            <TableBody>
              {repairs.map((repair) => (
                <TableRow key={repair.id}>
                  <TableCell>{repair.veiculo}</TableCell>
                  <TableCell>{repair.matricula}</TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <button><TableCell className="line-clamp-1">{repair.descricao}</TableCell></button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Clique para ver...
                        </DialogTitle>
                      </DialogHeader>
                      {repair.descricao}
                    </DialogContent>
                  </Dialog>
                  <TableCell>{repair.valor}€</TableCell>
                  <TableCell className="w-28">{format(new Date(repair.data), 'dd-MM-yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhuma reparação encontrada!</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        </div>
      </div>
      <div>
        <h1 className="text-2xl pb-8">Veículos registados</h1>
        <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[110px]">Marca</TableHead>
              <TableHead className="w-[110px]">Modelo</TableHead>
              <TableHead className="w-[110px]">Matricula</TableHead>
            </TableRow>
          </TableHeader>
          {cars.length > 0 ? (
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.marca}</TableCell>
                  <TableCell>{car.modelo}</TableCell>
                  <TableCell>{car.matricula}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhum carro encontrado!</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        </div>
      </div>
    </div>
  )
}