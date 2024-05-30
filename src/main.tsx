import "./global.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./routes/loginPage.tsx";
import { App } from "./App.tsx";
import { ErrorPage } from "./routes/errorPage.tsx";
import { ServicesPage } from "./routes/servicePage.tsx";
import { CreateNewUser } from "./routes/createUser.tsx";
import { PoliciesPage } from "./routes/policiesPage.tsx";
import { EmployeePage } from "./routes/empresa/employeePage.tsx";
import { RepairsPage } from "./routes/empresa/repairsPage.tsx";
import { ClientsPage } from "./routes/empresa/clientsPage.tsx";
import { ClientsArea } from "./routes/cliente/clientsArea-main.tsx";
import { EmpresaPage } from "./routes/empresa/empresaPage.tsx";
import { AuthProvider } from "./data/AuthContext.tsx";
import { OwnerPage } from "./routes/empresa/ownerPage.tsx";
import { SettingsPage } from "./routes/empresa/settingsPage.tsx";
import { ClientAccountSettings } from "./routes/cliente/clientsSettings.tsx";

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
    path: "/empresa/clientpage",
    element: <ClientsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cliente/clientArea",
    element: <ClientsArea />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cliente/clientSettings",
    element: <ClientAccountSettings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/carRepairs",
    element: <RepairsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/empresa/accountSettings",
    element: <SettingsPage />,
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
