import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import ContentWrapper from './components/content_wrapper/content_wrapper';
import NavBar from './components/nav_bar/nav_bar';
import { Toaster } from './components/ui/toaster';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <Providers>
          <main>
            <NavBar />
            <ContentWrapper>{children}</ContentWrapper>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
