import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const Redirect = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsChecking(false);
      setProgress(100);
    }, 4000);

    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        setProgress(i);
      }, i * 35);
    }

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

  return (
    <>
      {isChecking && (
        <div style={{ backgroundColor: "white", height: "100vh" }}>
          <h1 className="text-4xl flex justify-center align-middle">
            CARREGANDO...
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Progress value={progress} className="w-[60%]" />
          </div>
        </div>
      )}
    </>
  );
};
export default Redirect;
