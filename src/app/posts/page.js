import { db } from '../../utils/utilities.js';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs/server';
import { toast } from 'react-toastify';

export default async function postsPage() {
  const user = await currentUser();
  const snowboardingPosts = (
    await db.query(`SELECT * FROM snowboarding_posts ORDER BY id DESC`)
  ).rows;
  console.log('this is snowboarding post', snowboardingPosts);

  const snowboardingComments = (
    await db.query(`SELECT * FROM snowboarding_comments`)
  ).rows;
  console.log(snowboardingComments);
  //can also do in SQL unless you are like me and spend 30 minutes looking up to find a more complicated solution.

  const commentsByPostId = snowboardingComments.reduce((acc, comment) => {
    acc[comment.post_id] = acc[comment.post_id] || [];
    acc[comment.post_id].push(comment);
    return acc;
  }, {});

  console.log(commentsByPostId);

  async function handleDeletePost(formData) {
    'use server';
    const postId = formData.get('postId');

    const result = await db.query(
      'SELECT userid FROM snowboarding_posts WHERE id = $1',
      [postId]
    );
    const post = result.rows[0];
    console.log(
      'delete post function',
      post,
      snowboardingPosts.username,
      user.username
    );

    if (post.userid === user.username) {
      await db.query('DELETE FROM snowboarding_posts WHERE id = $1', [postId]);
      revalidatePath('/posts');
    } else {
      console.log('Idiot you can not remove that you did not make it');
    }
  }

  return (
    <>
      <h1> posts </h1>

      <ul>
        {snowboardingPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/profile/${post.userid}`}>{post.userid}</Link>
            <p>{post.post}</p>
            <form action={handleDeletePost} className='deleteForm'>
              <input type='hidden' name='postId' value={post.id} />
              <button className='blogDelete' type='submit'>
                delete
              </button>
            </form>
            <div>
              <h3>Comments</h3>
              <ul>
                {(commentsByPostId[post.id] || []).map((comment) => (
                  <li key={comment.id}>
                    <Link href={`profile/${comment.username}`}>
                      {comment.username}
                    </Link>
                    <p>{comment.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
