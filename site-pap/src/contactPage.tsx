import React from 'react'
import { contactSection } from './components/contactPage-section.tsx';
import { headerMenuNav } from './components/headerMenu.tsx';

export const ContactPage: React.FC = () => {
  return (
    <>
      <div className="header">
        {headerMenuNav()}
      </div>
      <div className="main">
        {contactSection()}
      </div>
    </>
  );
};