import {
  SignOutButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Link from 'next/link';
import '../css/NavBar.css';

import { auth, currentUser } from '@clerk/nextjs/server';
import BurgerMenu from './NavBar-Burger';

export default async function Header() {
  const user = await currentUser();

  return (
    <div className='masterContainer'>
      <div className='signedin'>
        <SignedIn>
          <h1 className='titleout title'> Chalet Sam </h1>
          <BurgerMenu />
        </SignedIn>
      </div>

      <div>
        <SignedOut>
          <div className='button-container'>
            <SignUpButton className='component2' mode='modal'>
              Sign Up
            </SignUpButton>
            <SignInButton className='component1' mode='modal'>
              Sign In
            </SignInButton>
          </div>
          <div className='text-container'>
            <h1 className='titleout'>Chalet Sam</h1>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
