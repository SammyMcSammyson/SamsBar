import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/utilities';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import '../../css/submission.css';

export default async function addPosts() {
  const user = await currentUser();
  console.log(user.username);

  async function handleSubmission(formData) {
    'use server';
    console.log('Saving post to the database...');

    const post = formData.get('post');
    const username = formData.get('username');

    await db.query(
      `INSERT INTO snowboarding_posts (post, userid) 
            VALUES ($1, $2)    `,
      [post, username]
    );

    console.log('Post working');

    revalidatePath('/submission');
    revalidatePath('/posts');
    revalidatePath(`/profile/${user.username}`);

    redirect('/posts');
  }

  return (
    <div className='mainSubmissionCointainer'>
      <h1> Add Post </h1>
      <div>
        <div>
          <form action={handleSubmission}>
            <label htmlFor='post'>Type away </label>
            <textarea id='post' name='post' type='text' required class="input"></textarea>

            <input
              type='hidden'
              id='username'
              name='username'
              value={user.username}
            />

            <button type='submit' className='input1'>
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
