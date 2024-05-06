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
import { useEffect, useState} from "react"

export function ReviewsMenu(){
    const [isOpen, setIsOpen] = useState(false)
    const [reviews, setReviews] = useState<any[]>([]);
    function handleCancel() {
      setIsOpen(false)
    }

    function handleSubmit(event:any) {
        event.preventDefault()
        const data = {
          name: (event.target as HTMLFormElement).nome.value,
          email:  (event.target as HTMLFormElement).email.value,
          description:  (event.target as HTMLFormElement).descricao.value
        }
        fetch('http://localhost:3000/createReviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
        setIsOpen(false)
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/lastReview');
            const data = await response.json();
            setReviews(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);
    return(
        <div className="flex justify-center mb-12">
            <div>
                <h1 className="font-bodyfooter text-4xl">Avaliações</h1>
            </div>
            <div>
                {reviews.map((review) => (
                    <Card className="w-72">
                        <CardHeader>Avaliação nº {review.id}</CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap justify-center">
                                <div className="grid grid-rows-1 gap-2 row-span-3 self-center max-w-md">
                                    <p>{review.nome}</p>
                                    <p>{review.email}</p>
                                    <p className="text-base font-medium break-words w-72 pl-2">{review.descricao}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsOpen(true)}>Faça a sua avaliação</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Avaliação</DialogTitle>
                            <DialogDescription>Preencha os campos necessários.</DialogDescription>   
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-4 items-center text-right gap-2"> 
                                <Label>Nome</Label>
                                <Input className="col-span-3" id="nome" placeholder="Introduza o seu nome..." required/>
                                <Label>Email (Não solicitado)</Label>
                                <Input className="col-span-3" id="email" type="email" placeholder="Introduza o seu email..."/>
                                <Label>Descrição</Label>
                                <textarea id="descricao" required placeholder="Introduza a descrição aqui..." className="col-span-3 flex h-36 min-h-36 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />                            
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={handleCancel}>Cancelar</Button>
                                <Button type="submit" id="submitReview">Submeter</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}