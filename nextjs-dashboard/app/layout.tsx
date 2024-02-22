import '@/app/ui/global.css';
import fonts from './ui/font';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${fonts.inter.className} antialiased`}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
