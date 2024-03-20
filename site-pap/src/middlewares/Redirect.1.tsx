import { useEffect, useState } from "react";
import { Progress } from "../components/ui/progress";

const Redirect = () => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsChecking(false);
    }, 1000);

    if (
      !localStorage.getItem("isLoggedIn") ||
      localStorage.getItem("isLoggedIn") !== "true"
    ) {
      window.location.href = "login.html";
    }
    window.onbeforeunload = () => {
      localStorage.removeItem("isLoggedIn");
    };

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isChecking) {
    return;
    <div>
      <Progress value={50} />;
    </div>;

    return null;
  }
  export default Redirect;
};
