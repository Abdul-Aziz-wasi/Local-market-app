import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './Router/Router.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// 🟩 React Query imports
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
         <ToastContainer position="top-center" autoClose={2000} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
