import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/utilities';
import BackButton from '@/components/Backbutton';
import { redirect } from 'next/navigation';

export default async function UserPage({ params }) {
  const userCurrent = await currentUser();

  const user = await params;

  if (user.username === userCurrent.username) {
    redirect('/profile/me');
  }
  console.log(
    'this is the pagePost',
    user,
    user.username,
    userCurrent.username
  );

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
      <h1> Welcome to {user.username}'s Profile</h1>
      <h3> A little bit about me</h3>
      <h3> {bio} </h3>
      <h1> My Posts </h1>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.post}</p>
          <p>{post.like}</p>
        </div>
      ))}
      <BackButton />
    </>
  );
}
