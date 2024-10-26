//If you want to set up a profile page that renders data from clerk you need:
//auth() ==> userID
//Current Uder ==> username, email adress etc.
//the data rendered here comes from 2 places. - data collected by clerk the other data comes from the user table
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/utilities';

import Link from 'next/link';

export default async function UserPage({ params }) {
  const user = await currentUser();

  const dbBio = await db.query(`SELECT bio FROM userid WHERE username = $1`, [
    user.username,
  ]);

  const bio = dbBio.rows[0].bio;

  const dbPosts = await db.query(
    `SELECT * FROM snowboarding_posts WHERE userid = $1`,
    [user.username]
  );

  const posts = dbPosts.rows;

  return (
    <>
      <h1> Welcome {user.username} to your Profile</h1>
      <h3> Here is your bio feel free to update it.</h3>
      <h3> {bio} </h3>
      <Link href="/edit">edit</Link>
      <h1> My Posts </h1>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.post}</p>
          <p>{post.like}</p>
        </div>
      ))}
    </>
  );
}