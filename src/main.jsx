import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <App />
      <Toaster/>
    </QueryClientProvider>
  </StrictMode>,
)
