import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Link from 'next/link';
import '../css/NavBar.css';

import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Header() {
  const user = await currentUser();

  return (
    <div className='masterContainer'>
      <SignedIn>
        <UserButton />
        <Link href='/'>Home</Link>
        <Link href='/posts'>Posts</Link>
        {user && <Link href={`/profile/me`}>Profile</Link>}
        <Link href='/submission'>Add Submission</Link>
      </SignedIn>
      <div className='signedout'>
        <SignedOut>
          <SignInButton className="component1" mode='modal'>Sign In</SignInButton>
          <SignUpButton mode='modal'>Sign Up</SignUpButton>
        </SignedOut>
      </div>
    </div>
  );
}
