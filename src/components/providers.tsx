'use client';

import { AuthProvider } from '@/features/auth/context/auth-context';
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';
import { Toaster } from './ui/toaster';

interface ProvidersProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

export default function Providers({ children, dehydratedState }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (dehydratedState) {
      hydrate(queryClient, dehydratedState);
    }
  }, [dehydratedState, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>

    </QueryClientProvider>
  );
}