import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <>
      <h1> sign in for the boys</h1>
      <SignIn />
    </>
  );
}
