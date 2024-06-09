import { HeaderMenuNav } from "./components/headerMenu";
import { MainPage } from "./components/main-page";
import { Footer } from "./components/footer";
import { HeaderImage } from "./components/headerImage";
import { ReviewsMenu } from "./components/reviewsMenu";
import { TesteCenas } from "./components/TesteCenas";

export function App() {
  return (
    <div>
      <HeaderMenuNav/>
      <HeaderImage/>
      <MainPage />
      <TesteCenas/>
      <Footer/>
    </div>
  )
}