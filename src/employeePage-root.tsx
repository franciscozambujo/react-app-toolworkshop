import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Employee } from './employeePage.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      < Employee/>
    </QueryClientProvider>
  </React.StrictMode>,
)