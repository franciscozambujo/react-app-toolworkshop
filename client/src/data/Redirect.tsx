import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export const Redirect = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsChecking(false);
      setProgress(100);
    }, 500);

    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        setProgress(i);
      }, i * 50);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (
    !localStorage.getItem("isLoggedIn") ||
    localStorage.getItem("isLoggedIn") !== "true"
  ) {
    window.location.href = "/login";
  }

  window.onbeforeunload = () => {
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      {!localStorage.getItem("isLoggedIn") && (
        <div className="bg-white h-full w-full">
          <Progress value={progress} />
        </div>
      )}
    </>
  );
};
