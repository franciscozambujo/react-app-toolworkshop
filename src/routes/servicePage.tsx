import { ServiceSection } from '../components/servicePage-section.tsx';
import { HeaderMenuNav } from '../components/headerMenu.tsx';
import { Footer } from '../components/footer.tsx';

export function ServicesPage() {
  return (
    <div>
      <HeaderMenuNav/>
      <ServiceSection/>
      <Footer />
    </div>
  );
};