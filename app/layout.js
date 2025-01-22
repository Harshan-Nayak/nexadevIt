import './globals.css';
import { Inter } from 'next/font/google';
import WhatsAppButton from './components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NexaDev - Innovative Digital Solutions',
  description: 'Building world-class mobile apps and websites tailored to your needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
