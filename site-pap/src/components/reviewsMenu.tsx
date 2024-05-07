import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function ReviewsMenu() {
  const usersLogo = new URL("@/public/images/user.png", import.meta.url).href;
  const [isOpen, setIsOpen] = useState(false);
  const [lastReview, setLastReview] = useState<any[]>([]);
  const [penultimateReview, setPenultimateReview] = useState<any[]>([]);
  const [antePenultimateReview, setAntePenultimateReview] = useState<any[]>([]);
  const [antantePenultimateReview, setAntantePenultimateReview] = useState<any[]>([]);
  function handleCancel() {
    setIsOpen(false);
  }
  const API_URL = "http://localhost:3000";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {    
    event.preventDefault();
    const formData = {
      name: (event.target as HTMLFormElement).nome.value,
      email: (event.target as HTMLFormElement).email.value,
      description: (event.target as HTMLFormElement).descricao.value,
    };
    
    fetch(`${API_URL}/createReviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(`Error creating review: ${error}`));
    setIsOpen(false);
    window.location.reload();
  }

  const fetchApiData = async (url: string) => {
    try {
      const response = await fetch(`${API_URL}/${url}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${url}: ${error}`);
    }
  };
  useEffect(() => {
    const urlsToFetch = [
      "lastReview",
      "penultimateReview",
      "antePenultimateReview",
      "antantePenultimateReview",
    ];
    const fetchAllData = async () => {
        const data = await Promise.all(
          urlsToFetch.map((url) => fetchApiData(url))
        );
        setLastReview(data[0]);
        setPenultimateReview(data[1]);
        setAntePenultimateReview(data[2]);
        setAntantePenultimateReview(data[3]);
      };
    fetchAllData();
  }, []);
  return (
    <div>
      <h1 className="flex justify-center font-bodyfooter text-4xl">
        Avaliações
      </h1>
      <div className="flex justify-center space-x-6 mt-10 p-2">
      {lastReview.map((lastReview) => (
          <Card className="w-72">
            <CardHeader>Avaliação nº {lastReview.id}</CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center">
                <div className="grid grid-rows-1 gap-2 row-span-3 self-center max-w-md">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={usersLogo} />
                    </Avatar>
                    <p>{lastReview.nome}</p>
                  </div>
                  <p>{lastReview.email}</p>
                  <p className="text-base font-medium break-words w-72 pl-2">
                    {lastReview.descricao}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {penultimateReview.map((penultimateReview) => (
          <Card className="w-72">
            <CardHeader>Avaliação nº {penultimateReview.id}</CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center">
                <div className="grid grid-rows-1 gap-2 row-span-3 self-center max-w-md">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={usersLogo} />
                    </Avatar>
                    <p>{penultimateReview.nome}</p>
                  </div>
                  <p>{penultimateReview.email}</p>
                  <p className="text-base font-medium break-words w-72 pl-2">
                    {penultimateReview.descricao}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {antePenultimateReview.map((antePenultimateReview) => (
          <Card className="w-72">
            <CardHeader>Avaliação nº {antePenultimateReview.id}</CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center">
                <div className="grid grid-rows-1 gap-2 row-span-3 self-center max-w-md">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={usersLogo} />
                    </Avatar>
                    <p>{antePenultimateReview.nome}</p>
                  </div>
                  <p>{antePenultimateReview.email}</p>
                  <p className="text-base font-medium break-words w-72 pl-2">
                    {antePenultimateReview.descricao}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {antantePenultimateReview.map((antantePenultimateReview) => (
          <Card className="w-72">
            <CardHeader>Avaliação nº {antantePenultimateReview.id}</CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center">
                <div className="grid grid-rows-1 gap-2 row-span-3 self-center max-w-md">
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={usersLogo} />
                    </Avatar>
                    <p>{antantePenultimateReview.nome}</p>
                  </div>
                  <p>{antantePenultimateReview.email}</p>
                  <p className="text-base font-medium break-words w-72 pl-2">
                    {antantePenultimateReview.descricao}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mb-12 mt-12">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className="font-bodyfooter bg-body"
            >
              Faça a sua avaliação
            </Button>
          </DialogTrigger>
          <DialogContent className="font-bodyfooter">
            <DialogHeader>
              <DialogTitle>Avaliação</DialogTitle>
              <DialogDescription>
                Preencha os campos necessários.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-4 items-center text-right gap-2">
                <Label>Nome</Label>
                <Input
                  className="col-span-3"
                  id="nome"
                  placeholder="Introduza o seu nome..."
                  required
                />
                <Label>Email (Não solicitado)</Label>
                <Input
                  className="col-span-3"
                  id="email"
                  type="email"
                  placeholder="Introduza o seu email..."
                />
                <Label>Descrição</Label>
                <textarea
                  id="descricao"
                  required
                  placeholder="Introduza a descrição aqui..."
                  className="col-span-3 flex h-36 min-h-36 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" id="submitReview" className="bg-body">
                  Submeter
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}