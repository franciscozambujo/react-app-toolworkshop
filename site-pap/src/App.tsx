import { headerMenuNav } from "./components/headerMenu";
import { carouselMain } from "./components/carousel-section";
import { mainPage } from "./components/main-page";
import { Footer } from "./components/footer";

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