import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

export function ReviewsMenu(){
    function CreateCard(){

    }
    return(
        <div className="flex justify-center mb-12">
            <div>
                <h1 className="font-bodyfooter text-4xl">Avaliações</h1>
            </div>
            <div> CARDS
                <Card>
                    <CardHeader>
                        <CardTitle>dsdsa</CardTitle>
                        <CardDescription>dsa</CardDescription>
                    </CardHeader>
                    <CardContent>dsa</CardContent>
                    <CardFooter>da</CardFooter>
                </Card>
            </div>
            <div>FORM REVIEWS
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Faça a sua avaliação</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Avaliação</DialogTitle>
                            <DialogDescription>Preencha os campos necessários.</DialogDescription>   
                        </DialogHeader>
                        <form className="space-y-8">
                            <div className="grid grid-cols-4 items-center text-right gap-2"> 
                                <Label>Nome</Label>
                                <Input className="col-span-3" id="AnonName" required/>
                                <Label>Email</Label>
                                <Input className="col-span-3" id="AnonEmail"/>
                                <Label>Descrição</Label>
                                <textarea className="col-span-3" id="AnonDesc" required placeholder="Introduza a descrição aqui..."/>                            
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline">Cancelar</Button>
                                <Button type="submit">Submeter</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}