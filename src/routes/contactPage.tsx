import { ContactSection } from '../components/contactPage-section.tsx';
import { HeaderMenuNav } from '../components/headerMenu.tsx';
import { Footer } from '../components/footer.tsx';

export function ContactPage() {
  return (
    <div>
      <HeaderMenuNav/>
      <ContactSection/>
      <Footer />
    </div>
  );
};