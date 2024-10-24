import { SignUp } from '@clerk/nextjs';
// needs connection with databae
//need auth and user id
//auth () and userID
//a form to collect the users profile data
//sql query to insert the user's data into the database.
//we need to redirect the users into the homepage once they submit profile form 
//try and catch for sql query 
export default function SignUpPage() {
  return (
    <>
      <h1> sign up for fun</h1>
      <SignUp />
    </>
  );
}
