import React from 'react'
import { contactSection } from './components/contactPage-section.tsx';
import { headerMenuNav } from './components/headerMenu.tsx';
import { Footer } from './components/footer.tsx';

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

export const ContactPage: React.FC = () => {
  return (
    <>
      <div className="header">
        {headerMenuNav()}
      </div>
      <div className="main">
        {contactSection()}
      </div>
      <footer>
        <Footer links={footerLinks}/>
      </footer>
    </>
  );
};