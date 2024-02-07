import { headerMenuNav } from "./components/headerMenu";
import { main } from "./components/main";

export function App() {
  return (
    <>
      <div className="header">
        {headerMenuNav()}
      </div>
      <div className="main">
      {main()}
      </div>
    </>
  )
}