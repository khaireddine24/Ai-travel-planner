import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple } from '@clerk/themes';
import { Toaster } from 'sonner';
import ErrorBoundary from './error/ErrorBoundary';

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
      <ClerkProvider 
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        appearance={{
          baseTheme: [shadesOfPurple],
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <App />
            <Toaster position='top-center'/>
          </ErrorBoundary>
        </QueryClientProvider>
      </ClerkProvider>
  </StrictMode>,
)
