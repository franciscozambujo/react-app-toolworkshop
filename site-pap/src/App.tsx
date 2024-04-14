import { headerMenuNav } from "./components/headerMenu";
import { carouselMain } from "./components/carousel-section";
import { mainPage } from "./components/main-page";
import { Footer } from "./components/footer";
import React, { useState, useEffect } from 'react';
import { getInvoices } from './api';

interface Invoices {
  id: number;
  cliente: number;
  veiculo: number;
  descricao: string;
  valor: number;
  data: string;
}

interface AppState {
  invoices: Invoices[];
}

const footerLinks = [
  {
    label: "Sobre Nós",
    href: "/about",
  },
  {
    label: "Contacto",
    href: "/about",
  },
  {
    label: "Agendar Revisão",
    href: "/",
  },
];
export function App() {
  const [invoices, setInvoices] = useState<Invoices[]>([]);
  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await getInvoices();
      setInvoices(response.data);
    };
    fetchInvoices();
  }, []);
  return (
    <>
      <header>
        {headerMenuNav()}
      </header>
      <section>
        {carouselMain()}
      </section>
      <main>
        {mainPage()}
      </main>
      <footer>
        <Footer links={footerLinks}/>
      </footer>
      <div>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
        </div>
      ))}
    </div>
    </>
  )
}