export const Redirect = () => {

  if (
    !localStorage.getItem("isLoggedIn") ||
    localStorage.getItem("isLoggedIn") !== "true"
  ) {
    window.location.href = "/login";
  }

  return (
    <>
      {!localStorage.getItem("isLoggedIn") ||
        localStorage.getItem("isLoggedIn") !== "true" && (
        <div className="absolute top-0 left-0 bg-white h-full w-full">
          Error 404
        </div>
      )}
    </>
  );
};
