import { Inter } from 'next/font/google';
import './globals.css';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })


import NavBar from '../components/NavBar.jsx';

export const metadata = {
  title: 'Sams Bar',
  description: 'Menace on Sobriety',
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
