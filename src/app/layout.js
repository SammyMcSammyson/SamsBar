import { Nova_Mono } from 'next/font/google';
import './globals.css';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';
const inter = Nova_Mono({
  weight: '400',
  subsets: ['latin'],
});

import NavBar from '../components/NavBar.jsx';

export const metadata = {
  title: 'Chalet Sam',
  description: 'Menace on Sobriety',
  icon: '/favicon.ico',
  apple: '/apple-touch-icon.png',
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
