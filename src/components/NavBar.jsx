import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Link from 'next/link';

// import { auth } from '@clerk/nextjs/dist/types/server';

export default function Header() {
  return (
    <>
      <SignedIn>
        <UserButton />
        <Link href='/'>Home</Link>
        <Link href='/posts'>Posts</Link>
        <Link href='/profile'>Profile</Link>
        <Link href='/submission'>Add Submission</Link>
      </SignedIn>
      <SignedOut>
      <Link href='/'>Home</Link>
      <Link href='/posts'>Posts</Link>
        <SignInButton mode='modal'> Sign In </SignInButton>
        <SignUpButton mode='modal'> Sign Up </SignUpButton>
      </SignedOut>
    </>
  );
}
