import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './css/styles.css' 

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <QueryClientProvider client={queryClient}>
   <AuthProvider>
    <App />
    </AuthProvider>
   </QueryClientProvider>
    </BrowserRouter>
)
