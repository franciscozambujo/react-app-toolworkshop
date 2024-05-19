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
import { ContactPage } from './routes/contactPage.tsx';
import { CreateNewUser } from './routes/createUser.tsx';
import { OwnerPage } from './routes/ownerPage.tsx';

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
    path: "/contact",
    element: <ContactPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/createuser",
    element: <CreateNewUser/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/contact",
    element: <ContactPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/ownerpage",
    element: <OwnerPage/>,
    errorElement: <ErrorPage/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)



