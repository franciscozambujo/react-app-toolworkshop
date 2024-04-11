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


export function DataTableF(){
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
                                <Input className="col-span-3"/>
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
                        <TableHead>Cliente</TableHead>
                        <TableHead>Veículo</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor do Arranjo</TableHead>
                    </TableHeader>
                    <TableBody>
                        {Array.from({length: 10}).map((_, i ) =>{
                            return(
                                <TableRow key= {i}>
                                    <TableCell>Cliente {i}</TableCell>
                                    <TableCell>Veículo {i}</TableCell>
                                    <TableCell>Descrição {i}</TableCell>
                                    <TableCell>DD/MM/AAAA</TableCell>
                                    <TableCell>Valor do Arranjo {i}€</TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}