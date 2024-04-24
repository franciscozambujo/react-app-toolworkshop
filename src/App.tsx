import { headerMenuNav } from "./components/headerMenu";
import { mainPage } from "./components/main-page";
import { Footer } from "./components/footer";

export function App() {
  return (
    <div>
      <header>
        {headerMenuNav()}
      </header>
      <main>
        {mainPage()}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}