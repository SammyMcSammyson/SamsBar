import { db } from '../../utils/utilities.js';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs/server';
import { toast, ToastContainer } from 'react-toastify';
import ToastError from '@/components/Toastify.jsx';
import { ClerkProvider } from '@clerk/nextjs';

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
      console.log(
        'Idiot you can not remove the post you did not make it stop being stupid'
      );
    }
  }
  async function handleDeleteComment(formData) {
    'use server';
    const commentId = formData.get('commentId');

    const result = await db.query(
      'SELECT username FROM snowboarding_comments WHERE id = $1',
      [commentId]
    );
    const comment = result.rows[0];
    console.log(
      'delete comment function',
      comment,
      snowboardingComments.username,
      user.username
    );

    if (comment.userid === user.username) {
      await db.query('DELETE FROM snowboarding_posts WHERE id = $1', [
        commentId,
      ]);
      revalidatePath('/posts');
    } else {
      console.log(
        'Idiot you can not remove the comment you did not make it stop being stupid'
      );
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

              <div className='postDelete' type='submit'>
                <ToastError/>
              </div>
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
                    <form action={handleDeleteComment} className='deleteForm'>
                      <input
                        type='hidden'
                        name='commentId'
                        value={comment.id}
                      />

                      <div className='postDelete' type='submit'>
                        <ToastError />
                      </div>
                    </form>
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
