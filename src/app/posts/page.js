import { db } from '../../utils/utilities.js';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import DropdownMenuPost from '@/components/Radix-Burger.jsx';
import DropdownMenuComment from '@/components/Radix-Burger-comment.jsx';
import '../../css/posts.css';
import { redirect } from 'next/navigation';

export default async function postsPage() {
  const user = await currentUser();

  const snowboardingPosts = (
    await db.query(`SELECT * FROM snowboarding_posts ORDER BY id DESC`)
  ).rows;

  const snowboardingComments = (
    await db.query(`SELECT * FROM snowboarding_comments`)
  ).rows;

  const commentsByPostId = snowboardingComments.reduce((acc, comment) => {
    acc[comment.post_id] = acc[comment.post_id] || [];
    acc[comment.post_id].push(comment);
    return acc;
  }, {});

  async function handleSubmission(formData) {
    'use server';
    console.log('Saving comment to the database...');

    const comment = formData.get('post');
    const username = formData.get('username');
    const post_id = formData.get('post_id');

    console.log('This is comment submission:', { comment, username, post_id });

    await db.query(
      `INSERT INTO snowboarding_comments (comment, username, post_id) 
      VALUES ($1, $2, $3)`,
      [comment, username, post_id]
    );

    console.log('Comment successfully added.');

    revalidatePath('/posts');
    redirect('/posts');
  }

  async function handleDeletePost(formData) {
    'use server';
    const postId = formData.get('postId');

    const result = await db.query(
      'SELECT userid FROM snowboarding_posts WHERE id = $1',
      [postId]
    );
    const post = result.rows[0];
    console.log('Delete post function:', {
      postUserId: post.userid,
      currentUsername: user.username,
    });

    if (post.userid === user.username) {
      await db.query('DELETE FROM snowboarding_posts WHERE id = $1', [postId]);
      revalidatePath('/posts');
      return { status: 'success' };
    } else {
      return {
        status: 'computer says no',
        message: 'You can only delete your own posts.',
      };
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
    console.log('Delete comment function:', commentId, user.username);

    if (comment.username === user.username) {
      await db.query('DELETE FROM snowboarding_comments WHERE id = $1', [
        commentId,
      ]);
      revalidatePath('/posts');
      return { status: 'success' };
    } else {
      return {
        status: 'computer says no',
        message: 'You can only delete your own comments.',
      };
    }
  }
  return (
    <>
      <h1>Posts</h1>
      <ul className='posts-list'>
        {snowboardingPosts.map((post) => (
          <li key={post.id} className='post-container'>
            <Link href={`/profile/${post.userid}`} className='post-user'>
              {post.userid}
            </Link>
            <p className='post-content'>{post.post}</p>

            <DropdownMenuPost
              handleDelete={handleDeletePost}
              postId={post.id}
            />

            <div className='comments-section'>
              <h3>Comments</h3>
              <ul className='comments-list'>
                {(commentsByPostId[post.id] || []).map((comment) => {
                  console.log('Rendering comment:', comment.id);
                  return (
                    <li key={comment.id} className='comment-container'>
                      <Link
                        href={`/profile/${comment.username}`}
                        className='comment-user'
                      >
                        {comment.username}
                      </Link>
                      <p className='comment-content'>{comment.comment}</p>
                      <DropdownMenuComment
                        handleDeleteComments={handleDeleteComment}
                        commentId={comment.id}
                      />
                    </li>
                  );
                })}
                <div>
                  <form action={handleSubmission}>
                    <label htmlFor='post'>Add Comment </label>
                    <textarea
                      id='post'
                      name='post'
                      type='text'
                      required
                    ></textarea>

                    <input
                      type='hidden'
                      id='username'
                      name='username'
                      value={user.username}
                    />
                    <input
                      type='hidden'
                      id='post_id'
                      name='post_id'
                      value={post.id}
                    />

                    <button type='submit' className='input'>
                      Post
                    </button>
                  </form>
                </div>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
