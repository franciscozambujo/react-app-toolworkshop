import { headerMenuNav } from "./components/headerMenu";
import { carouselMain } from "./components/carousel-section";
import { mainPage } from "./components/main-page";
import { footer } from "./components/footer";

export function App() {
  return (
    <>
      <div className="header">
        {headerMenuNav()}
      </div>
      <div className="carrousel">
        {carouselMain()}
      </div>
      <div className="main-page">
        {mainPage()}
      </div>
      <div className="main-page">
        {footer()}
      </div>
    </>
  )
}