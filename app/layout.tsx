import AuthProvider from '@/app/src/providers/AuthProvider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Header from './src/components/Header';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'BetDay Lite - Tu plataforma de apuestas deportivas',
  description:
    'BetDay Lite es tu destino para las mejores apuestas deportivas y pronósticos'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head></head>
      <body className={`${roboto.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
