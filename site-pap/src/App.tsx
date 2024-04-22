import { headerMenuNav } from "./components/headerMenu";
import { carouselMain } from "./components/carousel-section";
import { mainPage } from "./components/main-page";
import { Footer } from "./components/footer";
<<<<<<< HEAD

=======
>>>>>>> 9ee4e119bc73b098787eff74fd7ea6a2c01b19af
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
    <div>
      <header>
        {headerMenuNav()}
      </header>
      <section>
        {carouselMain()}
      </section>
      <main className="">
        {mainPage()}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}