import { DialogDescription } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label }from "./ui/label"
import { Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow, } from "./ui/table"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { format } from 'date-fns';


export function DataTableF(){
    const [invoices, setInvoices] = useState<any[]>([]);
    const [matricula, setMatricula] = useState<any[]>([]);
    const [nomeCliente, setNomeCliente] = useState('');

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
    }, []);
    return (
    <div className="p-8 max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
            <form className="flex items-center gap-8">
                <Input name="client" placeholder="Pesquisar Dados"/>
                <Button type="submit" variant="link">Pesquisar resultados</Button>
            </form>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-body">Nova Fatura</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nova Fatura</DialogTitle>
                        <DialogDescription>Preencha os campos necessários.</DialogDescription>   
                    </DialogHeader>
                    <form className="space-y-8">
                        <div className="grid grid-cols-4 items-center text-right gap-5"> 
                            <Label>Nome do Cliente</Label>
                            <Input
                            className="col-span-3"
                            type="text"
                            value={nomeCliente}
                            onChange={(e) => setNomeCliente(e.target.value)}
                            placeholder="Francisco"
                            />
                            <Label>Matrícula</Label>
                            <select 
                                value={matricula}
                                onChange={(valor) => setMatricula(valor)}
                                className="col-span-3" 
                                name="carPlate" 
                                id="carPlate">
                                placeholder="Selecione a matrícula"
                            </select>
                            <Label>Descrição</Label>
                            <Input className="col-span-3" id="description"/>
                            <Label>Valor</Label>
                            <Input className="col-span-3" id="value"/>
                            <Label>Data</Label>
                            <Input className="col-span-3" id="date"/>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-body">Criar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        <div className="border rounded-lg p-2">
            <Table>
                <TableHeader>
                    <TableHead className="w-[130px]">Nome do Cliente</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead className="w-[130px]">Matrícula</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="w-[150px]">Valor</TableHead>
                    <TableHead>Data</TableHead>
                </TableHeader>
                {invoices.length > 0 ? (
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
                    <p>Loading Invoices | Turn On API...</p>
                )}
            </Table>
        </div>
    </div>
    )
}