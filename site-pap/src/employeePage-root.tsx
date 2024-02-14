import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Employee } from './employeePage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    < Employee/>
  </React.StrictMode>,
)