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
import * as React from 'react';
import Rating from '@mui/material/Rating';

export function ReviewsMenu() {
  const usersLogo = new URL("@/public/images/user.png", import.meta.url).href;
  const [star, setStar] = React.useState<number | null>(2);
  const [isOpen, setIsOpen] = useState(false);
  const [lastReview, setLastReview] = useState<any[]>([]);
  const [penultimateReview, setPenultimateReview] = useState<any[]>([]);
  const [antePenultimateReview, setAntePenultimateReview] = useState<any[]>([]);
  const [antantePenultimateReview, setAntantePenultimateReview] = useState<any[]>([]);
  const API_URL = "http://localhost:3000";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {    
    event.preventDefault();
    const formData = {
      name: (event.target as HTMLFormElement).nome.value,
      email: (event.target as HTMLFormElement).email.value,
      description: (event.target as HTMLFormElement).descricao.value,
      rating: star,
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
      console.error("Error fetching reviews:", error);
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
      try {
        const data = await Promise.all(
          urlsToFetch.map((url) => fetchApiData(url))
        );
        setLastReview(data[0]);
        setPenultimateReview(data[1]);
        setAntePenultimateReview(data[2]);
        setAntantePenultimateReview(data[3]);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchAllData();
    }, []);
    return (
    <div>
      <h1 className="flex justify-center font-bodyfooter text-4xl">
        Avaliações
      </h1>
    <div className="flex justify-center space-x-6 mt-10 p-2">
      {lastReview.length > 0 ? (
      lastReview.map((lastReview) => (
        <Card className="w-72" key={lastReview.id}>
          <CardHeader>Avaliação nº {lastReview.id}</CardHeader>
          <CardContent>
          <div className="flex">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={usersLogo} />
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center -mt-1">
                  <p className="font-semibold cursor-pointer">{lastReview.nome}</p>
                </div>
                <div className="font-light text-md text-[#4b587c]">{lastReview.email}</div>
              </div>
            </div>
          </div>
          <Rating className="mt-3" defaultValue={lastReview.estrelas} readOnly />
            <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
              {lastReview.descricao}
            </p>
          </CardContent>
        </Card>
      ))
      ) : (
        <Card className="w-72">
        <CardHeader>Avaliação nº</CardHeader>
        <CardContent>
        <div className="flex">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={usersLogo} />
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center -mt-1">
                <p className="font-semibold cursor-pointer">Nome</p>
              </div>
              <div className="font-light text-md text-[#4b587c]">Email</div>
            </div>
          </div>
        </div>
        <Rating className="mt-3" defaultValue={0} readOnly />
          <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
            Avaliação não disponível
          </p>
        </CardContent>
      </Card>
      )}
        {penultimateReview.length > 0 ? (
        penultimateReview.map((penultimateReview) => (
          <Card className="w-72" key={penultimateReview.id}>
          <CardHeader>Avaliação nº {penultimateReview.id}</CardHeader>
          <CardContent>
          <div className="flex">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={usersLogo} />
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center -mt-1">
                  <p className="font-semibold cursor-pointer">{penultimateReview.nome}</p>
                </div>
                <div className="font-light text-md text-[#4b587c]">{penultimateReview.email}</div>
              </div>
            </div>
          </div>
          <Rating className="mt-3" defaultValue={penultimateReview.estrelas} readOnly />
            <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
              {penultimateReview.descricao}
            </p>
          </CardContent>
        </Card>
          ))
          ) : (
            <Card className="w-72">
            <CardHeader>Avaliação nº</CardHeader>
            <CardContent>
            <div className="flex">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={usersLogo} />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center -mt-1">
                    <p className="font-semibold cursor-pointer">Nome</p>
                  </div>
                  <div className="font-light text-md text-[#4b587c]">Email</div>
                </div>
              </div>
            </div>
            <Rating className="mt-3" defaultValue={0} readOnly />
              <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
                Avaliação não disponível
              </p>
            </CardContent>
          </Card>
          )}
        {antePenultimateReview.length > 0 ? (
        antePenultimateReview.map((antePenultimateReview) => (
          <Card className="w-72" key={antePenultimateReview.id}>
          <CardHeader>Avaliação nº {antePenultimateReview.id}</CardHeader>
          <CardContent>
          <div className="flex">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={usersLogo} />
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center -mt-1">
                  <p className="font-semibold cursor-pointer">{antePenultimateReview.nome}</p>
                </div>
                <div className="font-light text-md text-[#4b587c]">{antePenultimateReview.email}</div>
              </div>
            </div>
          </div>
          <Rating className="mt-3" defaultValue={antePenultimateReview.estrelas} readOnly />
            <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
              {antePenultimateReview.descricao}
            </p>
          </CardContent>
        </Card>
          ))
          ) : (
            <Card className="w-72">
            <CardHeader>Avaliação nº</CardHeader>
            <CardContent>
            <div className="flex">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={usersLogo} />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center -mt-1">
                    <p className="font-semibold cursor-pointer">Nome</p>
                  </div>
                  <div className="font-light text-md text-[#4b587c]">Email</div>
                </div>
              </div>
            </div>
            <Rating className="mt-3" defaultValue={0} readOnly />
              <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
                Avaliação não disponível
              </p>
            </CardContent>
          </Card>
          )}
        {antantePenultimateReview.length > 0 ? (
        antantePenultimateReview.map((antantePenultimateReview) => (
          <Card className="w-72" key={antantePenultimateReview.id}>
          <CardHeader>Avaliação nº {antantePenultimateReview.id}</CardHeader>
          <CardContent>
          <div className="flex">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={usersLogo} />
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center -mt-1">
                  <p className="font-semibold cursor-pointer">{antantePenultimateReview.nome}</p>
                </div>
                <div className="font-light text-md text-[#4b587c]">{antantePenultimateReview.email}</div>
              </div>
            </div>
          </div>
          <Rating className="mt-3" defaultValue={antantePenultimateReview.estrelas} readOnly />
            <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
              {antantePenultimateReview.descricao}
            </p>
          </CardContent>
        </Card>
          ))
          ) : (
          <Card className="w-72">
            <CardHeader>Avaliação nº</CardHeader>
            <CardContent>
            <div className="flex">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={usersLogo} />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center -mt-1">
                    <p className="font-semibold cursor-pointer">Nome</p>
                  </div>
                  <div className="font-light text-md text-[#4b587c]">Email</div>
                </div>
              </div>
            </div>
            <Rating className="mt-3" defaultValue={0} readOnly />
            <p className="text-base mt-2 text-[18px] font-medium break-words w-64 p-4">
              Avaliação não disponível
            </p>
            </CardContent>
          </Card>
          )}
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
                  placeholder="Ex: Fernando"
                  required
                />
                <Label>Email (Não obrigatório)</Label>
                <Input
                  className="col-span-3"
                  id="email"
                  type="email"
                  placeholder="Ex: fernando@gmail.com"
                />
                <Label>Descrição</Label>
                <textarea
                  id="descricao"
                  required
                  placeholder="Ex: Serviço bastante prestável, aconselho."
                  className="col-span-3 flex h-36 max-h-72 min-h-36 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
               <Rating
                  className="px-9 mt-2"
                  value={star}  
                  onChange={(_event, newValue) => {
                    setStar(newValue);
                  }}
                />
              </div>
              <DialogFooter>
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