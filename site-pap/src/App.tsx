import { headerMenuNav } from "./components/headerMenu";
import { carouselMain } from "./components/carousel-section";

export function App() {
  return (
    <>
      <div className="header">
        {headerMenuNav()}
      </div>
      <div className="carrousel">
        {carouselMain()}
      </div>
    </>
  )
}