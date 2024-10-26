import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Link from 'next/link';

import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Header() {
  const user = await currentUser();

  return (
    <>
      <SignedIn>
        <UserButton />
        <Link href='/'>Home</Link>
        <Link href='/posts'>Posts</Link>
        {user && <Link href={`/profile/me`}>Profile</Link>}
        <Link href='/submission'>Add Submission</Link>
      </SignedIn>
      <SignedOut>
        <Link href='/'>Home</Link>
        <Link href='/posts'>Posts</Link>
        <SignInButton mode='modal'>Sign In</SignInButton>
        <SignUpButton mode='modal'>Sign Up</SignUpButton>
      </SignedOut>
    </>
  );
}
