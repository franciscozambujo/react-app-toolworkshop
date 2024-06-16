import { HeaderMenuNav } from "./components/headerMenu";
import { MainPage } from "./components/main-page";
import { Footer } from "./components/footer";
import { HeaderImage } from "./components/headerImage";
import { ReviewsMenu } from "./components/reviewsMenu";
import { motion } from "framer-motion";

export function App() {
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5 }}
  >
      <div>
        <HeaderMenuNav/>
        <HeaderImage/>
        <MainPage />
        <ReviewsMenu/>
        <Footer/>
      </div>
  </motion.div>
  )
}