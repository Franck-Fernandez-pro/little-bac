'use client';

import dynamic from 'next/dynamic';
import ConvexClientProvider from './ConvexClientProvider';
import { ThemeProvider } from './ThemeProvider';
const UserProvider = dynamic(() => import('./UserProvider'), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </ConvexClientProvider>
  );
}
