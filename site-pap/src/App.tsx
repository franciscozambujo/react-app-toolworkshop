import { headerMenuNav } from "./components/headerMenu";
import { carouselMain } from "./components/carousel-section";
import { mainPage } from "./components/main-page";
import { Footer } from "./components/footer";
import { TesteGet } from "./components/teste";

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
        {TesteGet()}
      </main>
      <footer>
        <Footer links={footerLinks}/>
      </footer>
    </>
  )
}