import { HeaderMenuNav } from "./components/headerMenu";
import { MainPage } from "./components/main-page";
import { Footer } from "./components/footer";
import { HeaderImage } from "./components/headerImage";

export function App() {
  return (
    <div>
      <HeaderMenuNav/>
      <HeaderImage/>
      <MainPage />
      <Footer/>
    </div>
  )
}