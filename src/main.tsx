import "./global.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./routes/loginPage.tsx";
import { App } from "./App.tsx";
import { ErrorPage } from "./routes/errorPage.tsx";
import { ServicesPage } from "./routes/empresa/servicePage.tsx";
import { CreateNewUser } from "./routes/createUser.tsx";
import { PoliciesPage } from "./routes/policiesPage.tsx";
import { EmployeePage } from "./routes/empresa/employeePage.tsx";
import { RepairsPage } from "./routes/empresa/repairsPage.tsx";
import { VehiclesPage } from "./routes/empresa/vehiclesPage.tsx";
import { ClientsPage } from "./routes/empresa/clientsPage.tsx";
import { EmpresaPage } from "./routes/empresa/empresaPage.tsx";
import { AuthProvider } from "./data/AuthContext.tsx";
import { OwnerPage } from "./routes/empresa/ownerPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createuser",
    element: <CreateNewUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/ownerpage",
    element: <OwnerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/employeepage",
    element: <EmployeePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/carRepairs",
    element: <RepairsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/geral",
    element: <EmpresaPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/clients",
    element: <ClientsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/vehicles",
    element: <VehiclesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/policies",
    element: <PoliciesPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
