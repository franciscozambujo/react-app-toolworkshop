import React from 'react'
import { ContactSection } from './components/contactPage-section.tsx';
import { HeaderMenuNav } from './components/headerMenu.tsx';
import { Footer } from './components/footer.tsx';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <HeaderMenuNav/>
      <ContactSection/>
      <Footer />
    </div>
  );
};