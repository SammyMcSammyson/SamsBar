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
    await db.query(`SELECT * FROM snowboarding_comments ORDER BY id ASC`)
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

  async function handleLike(formData) {
    'use server';

    const postId = formData.get('postId');
    const username = formData.get('username');
    //started with such lofty goals little did I know of the pain to come.

    const likeCheker = await db.query(
      `SELECT * FROM post_likes WHERE username = $1 AND post_id = $2`,
      [username, postId]
    ); //super simple

    if (likeCheker.rows.length > 0) {
      await db.query(
        `DELETE FROM post_likes WHERE username = $1 AND post_id = $2`,
        [username, postId]
      ); // also super simple

      await db.query(
        `UPDATE snowboarding_posts SET "like" = "like" - 1 WHERE id = $1`,
        [postId]
      ); //it is always the quotes which slip me up medium dificulty but still doable especially since the SQL was right.

      console.log('Like deleted you noob');
    } else {
      await db.query(
        `INSERT INTO post_likes (username, post_id) VALUES ($1, $2)`,
        [username, postId]
      ); //did not nail the SQL logic for this at all needed to do some googleing but I had the right idea. This was harddddddd.

      await db.query(
        `UPDATE snowboarding_posts SET "like" = "like" + 1 WHERE id = $1`,
        [postId]
      ); //did not nail the SQL logic for this at all needed to do some googleing but I had the right idea. Thankfully mark zuckeberg did all the hard work 20 years ago and I can copy him.

      console.log('Post liked mofo');
    }
    revalidatePath('/posts'); //update at the end.
  }

  async function handleDislike(formData) {
    'use server';

    const postId = formData.get('postId');
    const username = formData.get('username');
    //same code

    const likeCheker = await db.query(
      `SELECT * FROM post_dislikes WHERE username = $1 AND post_id = $2`,
      [username, postId]
    );

    if (likeCheker.rows.length > 0) {
      await db.query(
        `DELETE FROM post_dislikes WHERE username = $1 AND post_id = $2`,
        [username, postId]
      );

      await db.query(
        `UPDATE snowboarding_posts SET "dislikes" = "dislikes" - 1 WHERE id = $1`,
        [postId]
      );

      console.log('disLike deleted you noob');
    } else {
      await db.query(
        `INSERT INTO post_dislikes (username, post_id) VALUES ($1, $2)`,
        [username, postId]
      ); //did not nail the SQL logic for this at all needed to do some googleing but I had the right idea. This was harddddddd.

      await db.query(
        `UPDATE snowboarding_posts SET "dislike" = "dislike" + 1 WHERE id = $1`,
        [postId]
      ); //did not nail the SQL logic for this at all needed to do some googleing but I had the right idea. Thankfully mark zuckeberg did all the hard work 20 years ago and I can copy him.

      console.log('Post disliked mofo');
    }
    revalidatePath('/posts'); //update at the end.
  }
  async function handleCommentLike(formData) {
    'use server';

    const postId = formData.get('postId');
    const username = formData.get('username');
    //same code

    const likeCheker = await db.query(
      `SELECT * FROM comment_likes WHERE username = $1 AND post_id = $2`,
      [username, postId]
    );

    if (likeCheker.rows.length > 0) {
      await db.query(
        `DELETE FROM comment_likes WHERE username = $1 AND post_id = $2`,
        [username, postId]
      );

      await db.query(
        `UPDATE snowboarding_comments SET "like" = "like" - 1 WHERE id = $1`,
        [postId]
      );

      console.log('disLike deleted you noob');
    } else {
      await db.query(
        `INSERT INTO comment_likes (username, post_id) VALUES ($1, $2)`,
        [username, postId]
      );
      await db.query(
        `UPDATE snowboarding_comments SET "like" = "like" + 1 WHERE id = $1`,
        [postId]
      );

      console.log('Comment liked mofo');
    }
    revalidatePath('/posts'); //update at the end.
  }

  async function handleCommentDislike(formData) {
    'use server';

    const postId = formData.get('postId');
    const username = formData.get('username');
    //same code

    const likeCheker = await db.query(
      `SELECT * FROM comment_dislikes WHERE username = $1 AND post_id = $2`,
      [username, postId]
    );

    if (likeCheker.rows.length > 0) {
      await db.query(
        `DELETE FROM comment_dislikes WHERE username = $1 AND post_id = $2`,
        [username, postId]
      );

      await db.query(
        `UPDATE snowboarding_comments SET "dislike" = "dislike" - 1 WHERE id = $1`,
        [postId]
      );

      console.log('disLike deleted you noob');
    } else {
      await db.query(
        `INSERT INTO comment_dislikes (username, post_id) VALUES ($1, $2)`,
        [username, postId]
      );

      await db.query(
        `UPDATE snowboarding_comments SET "dislike" = "dislike" + 1 WHERE id = $1`,
        [postId]
      );

      console.log('Post disliked you meaniie');
    }
    revalidatePath('/posts');
  }

  return (
    <>
      <h1>Posts</h1>
      <ul className='postsList'>
        {snowboardingPosts.map((post) => (
          <li key={post.id} className='postContainer'>
            <Link href={`/profile/${post.userid}`} className='postUser'>
              {post.userid}
              <div className='commentHeader'>
                <DropdownMenuPost
                  handleDelete={handleDeletePost}
                  postId={post.id}
                />
              </div>
            </Link>
            <p className='postContent'>{post.post}</p>
            <div className='buttonContainer'>
              <form action={handleLike}>
                <input type='hidden' name='postId' value={post.id} />
                <input type='hidden' name='username' value={user.username} />
                <button type='submit' className='like-button'>
                  👍
                </button>
              </form>
              <p>{post.like}</p>

              <form action={handleDislike}>
                <input type='hidden' name='postId' value={post.id} />
                <input type='hidden' name='username' value={user.username} />
                <button type='submit' className='like-button'>
                  👎
                </button>
              </form>
              <p>{post.dislikes}</p>
            </div>

            <div className='commentsSection'>
              <h3>Comments</h3>
              <ul className='commentsList'>
                {(commentsByPostId[post.id] || []).map((comment) => {
                  console.log('comment:', comment.id);
                  return (
                    <li key={comment.id} className='commentContainer'>
                      <Link
                        href={`/profile/${comment.username}`}
                        className='commentUser'
                      >
                        {comment.username}
                      </Link>
                      <div className='commentHeader'>
                        <DropdownMenuComment
                          handleDeleteComments={handleDeleteComment}
                          commentId={comment.id}
                        />
                      </div>
                      <p className='commentContent'>{comment.comment}</p>

                      <div className='buttonContainer'>
                        <form action={handleCommentLike}>
                          <input
                            type='hidden'
                            name='postId'
                            value={comment.id}
                          />
                          <input
                            type='hidden'
                            name='username'
                            value={user.username}
                          />
                          <button type='submit' className='like-button'>
                            👍
                          </button>
                        </form>
                        <p> {comment.like}</p>

                        <form action={handleCommentDislike}>
                          <input
                            type='hidden'
                            name='postId'
                            value={comment.id}
                          />
                          <input
                            type='hidden'
                            name='username'
                            value={user.username}
                          />
                          <button type='submit' className='like-button'>
                            👎
                          </button>
                        </form>
                        <p> {comment.dislike}</p>
                      </div>
                    </li>
                  );
                })}
                <div>
                  <form action={handleSubmission}>
                    <label htmlFor='post'>Add Comment: </label>
                    <textarea
                      id='post'
                      name='post'
                      type='text'
                      required
                      className="textbox"
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
