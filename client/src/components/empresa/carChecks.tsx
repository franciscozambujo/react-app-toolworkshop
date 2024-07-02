import { useContext, useEffect, useState } from "react"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import { format } from "date-fns";
import { Button } from "../ui/button";
  
export function CarChecksEnterprise () {
    const [searchDataChecks, setSearchDataChecks] = useState<any[]>([]);
    const API_URL = "http://localhost:3000";
    const rowsPerPage = 5;
    const [data, setData] = useState<any[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);
    const [totalPages, setTotalPages] = useState(0);
    const currentPage = Math.floor(startIndex / rowsPerPage) + 1;
    const formRef = useRef<HTMLFormElement>(null);
  
    useEffect(() => {
      const fetchData = async()=> {
        try{
            const searchResponseChecks = await fetch(`${API_URL}/carChecks`)
            const searchDataChecks = await searchResponseChecks.json();
            setSearchDataChecks(searchDataChecks);
            setData(searchDataChecks);
            setTotalPages(Math.ceil(searchDataChecks.length / rowsPerPage));
            console.log(searchDataChecks[0].cliente)
        }catch (error){
            console.error("Error fetchind data:", error);
        }
      };
      fetchData();
    },[]);

    const handlePagination = (direction: 'next' | 'prev') => {
      if (direction === 'next') {
        if (endIndex < searchDataChecks.length) {
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

    const handleCheckState = async (checkId: number, newState: string) => {
        console.log(checkId);
        try {
          const response = await fetch(`${API_URL}/changeCheckState/${checkId}/${newState}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: checkId,
            }),
          });
      
          if (response.ok) {
            const updatedData = searchDataChecks.map((check) =>
              check.id === checkId ? { ...check, estado: newState } : check
            );
            setData(updatedData);
          } else {
            console.error("Error changing check state:", await response.text());
          }
        } catch (error) {
          console.error("Error during update:", error);
        }
        if (newState === "Aceite") {
          try {
            const result = await emailjs.sendForm(
              'service_c122uep',
              'template_1yu5oop',
              formRef.current!,
              {
                publicKey: 'imKSMDe-FLHJUirbR',
              }
            );
            console.log('Email sent!', result.text);
          } catch (error:any) {
            console.error('Email sending error:', error.text);
          }
        }
        else if (newState === "Não Aceite") {
          try {
            const result = await emailjs.sendForm(
              'service_c122uep',
              'template_7x05efz',
              formRef.current!,
              {
                publicKey: 'imKSMDe-FLHJUirbR',
              }
            );
            console.log('Email sent!', result.text);
          } catch (error:any) {
            console.error('Email sending error:', error.text);
          }
        }
      };
      useEffect(() => {
        setSearchDataChecks(data);
      }, [data]);
  return (
    <div className="p-8 max-w-5xl space-y-4 m-auto">
        <h1 className="text-3xl">Propostas de revisões</h1>
        <div className="border rounded-lg p-2">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[130px]">Nome de cliente</TableHead>
                <TableHead className="w-[150px]">Carro</TableHead>
                <TableHead className="w-[150px]">Matrícula</TableHead>
                <TableHead className="w-[150px]">Data agendada</TableHead>
                <TableHead className="w-[150px]">Estado da revisão</TableHead>
                </TableRow>
            </TableHeader>
            {searchDataChecks.length > 0 && (
                <TableBody>
                {data.slice(startIndex, endIndex).map((checkData) => (
                <TableRow key={checkData.id} className="hover:bg-muted/50">
                    <TableCell>{checkData.cliente}</TableCell>
                    <TableCell>{checkData.carro}</TableCell>
                    <TableCell>{checkData.matricula}</TableCell>
                    <TableCell>{format(new Date(checkData.data_agendada), 'dd-MM-yyyy')}</TableCell>
                    <TableCell>{checkData.estado}</TableCell>
                    {checkData.estado !== "Aceite" && checkData.estado !== "Não Aceite" && (
                    <TableCell className="flex gap-x-6">
                        <Button 
                        onClick={() => handleCheckState(checkData.id, "Aceite")}
                        className="bg-[#00865A] hover:bg-green-900 text-white">
                            Aceitar
                        </Button>
                        <Button 
                        onClick={() => handleCheckState(checkData.id, "Não Aceite")} 
                        className="bg-red-600 text-white hover:bg-red-800">
                            Rejeitar
                        </Button>
                    </TableCell>
                    )}
                </TableRow>
                ))}
                </TableBody>
            )}
            </Table>
            <form ref={formRef} hidden>
              <input type="hidden" name="cliente" value="" />
              <input type="hidden" name="carro" value="" />
              <input type="hidden" name="data_agendada" value="" />
            </form>
        </div>
        <div>
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
        </div>
    </div>
  )
}