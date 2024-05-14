import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ContactPage } from './contactPage.tsx';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Employee } from './employeePage.tsx';
import { Owner } from './ownerPage.tsx';
import { Login } from './loginPage.tsx';

const router = createBrowserRouter([
  {
    path: "/site-pap/",
    element: <App />,
    children: [
      {
        path: "/site-pap/contactPage.html",
        element: <ContactPage/>
      },
      {
        path: "/site-pap/owner.html",
        element: <Owner/>
      },
      {
        path: "/site-pap/employee.html",
        element: <Employee/>
      },
      {
        path: "/site-pap/login.html",
        element: <Login/>
      }
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    < RouterProvider router= {router}/>
  </React.StrictMode>,
)



