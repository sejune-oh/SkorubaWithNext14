import '@/app/ui/global.css';
import fonts from './ui/font';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fonts.inter.className} antialiased`}>{children}</body>
    </html>
  );
}
