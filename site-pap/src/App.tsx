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
      <div className="carousel">
        {carouselMain()}
      </div>
      <div className="main-page">
        {mainPage()}
      </div>
      <div className="footer">
        {footer()}
      </div>
    </>
  )
}