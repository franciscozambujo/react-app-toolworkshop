import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import {LoginPage} from './routes/loginPage.tsx'
import { App } from './App.tsx';
import {ErrorPage} from './routes/errorPage.tsx';
import { ServicesPage } from './routes/servicePage.tsx';
import { CreateNewUser } from './routes/createUser.tsx';
import { OwnerPage } from './routes/ownerPage.tsx';
import { PoliciesPage } from './routes/policiesPage.tsx';
import { EmployeePage } from './routes/employeePage.tsx';
import { RepairsPage } from './routes/repairsPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/services",
    element: <ServicesPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/createuser",
    element: <CreateNewUser/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/empresa/ownerpage",
    element: <OwnerPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/empresa/employeepage",
    element: <EmployeePage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/empresa/CarRepairs",
    element: <RepairsPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/policies",
    element: <PoliciesPage/>,
    errorElement: <ErrorPage/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)