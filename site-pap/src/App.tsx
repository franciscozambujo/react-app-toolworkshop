import { HeaderMenuNav } from "./components/headerMenu";
import { MainPage } from "./components/main-page";
import { Footer } from "./components/footer";

export function App() {
  return (
    <div>
        <HeaderMenuNav/>
        <MainPage />
        <Footer/>
    </div>
  )
}