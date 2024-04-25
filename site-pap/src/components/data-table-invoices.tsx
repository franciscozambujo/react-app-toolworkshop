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
        
        <div className="p-6 max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
                <form className="flex items-center gap-2">
                    <Input name="client" placeholder="Pesquisar Dados"/>
                    <Button type="submit" variant="link">Pesquisar resultados</Button>
                </form>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Nova Fatura</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nova Fatura</DialogTitle>
                            <DialogDescription>Preencha os campos necessários.</DialogDescription>   
                        </DialogHeader>
                        <form className="space-y-6">
                            <div className="grid grid-cols-4 items-center text-right gap-2"> 
                                <Label>Nome do Cliente</Label>
                                <Input className="col-span-3" id="clientName"/>
                                'meter combobox e ir ver logo quais os carros que correspondem a este cliente
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline">Cancelar</Button>
                                <Button type="submit">Criar</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableHead>Nome do Cliente</TableHead>
                        <TableHead>Veículo</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                    </TableHeader>
                    {invoices.length > 0 ? (
                    <TableBody>
                        {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.cliente}</TableCell>
                            <TableCell>{invoice.veiculo}</TableCell>
                            <TableCell>{invoice.matricula}</TableCell>
                            <TableCell>{invoice.descricao}</TableCell>
                            <TableCell>{invoice.valor}</TableCell>
                            <TableCell>{format(new Date(invoice.data), 'dd-MM-yyyy')}</TableCell>
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