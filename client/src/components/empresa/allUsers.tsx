import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

export function AllUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = Math.floor(startIndex / rowsPerPage) + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
        console.log(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePagination = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (endIndex < users.length) {
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

  return (
    <div className="p-8 max-w-5xl space-y-4 m-auto">
        <h1 className="text-3xl">Utilizadores registados</h1>
        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[130px]">Username</TableHead>
                <TableHead className="w-[130px]">Nome</TableHead>
                <TableHead className="w-[130px]">Nrº telemóvel</TableHead>
                <TableHead className="w-[130px]">Email</TableHead>
                <TableHead className="w-[130px]">Cargo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.user}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.telemovel}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.cargo}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
  );
}