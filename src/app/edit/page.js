import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/utilities';
import { redirect } from 'next/navigation';

export default async function editProfile() {
  const { userId } = await auth();
  const user = await currentUser();
  console.log('this is user', user.username);
  console.log('this is user ID', userId);

  async function handleProfile(formData) {
    'use server';
    console.log('Saving post to the database...');

    const UserName = user.username;
    const Bio = formData.get('Bio');

    await db.query(
      `UPDATE userid 
         SET bio = $1 
         WHERE username = $2`,
      [Bio, UserName]
    );
    console.log('Save working');
    redirect(`/profile/${user.username}`);
  }

  const dbBio = await db.query(`SELECT bio FROM userid WHERE username = $1`, [
    user.username,
  ]);

  const editBio = dbBio.rows[0].bio;

  return (
    <div>
      <h1> Profile page </h1>
      <h2> Welcome {user.username}</h2>
      <h3> Here is your Bio</h3>
      <div>
        <form action={handleProfile} className='formSubmission'>
          <label htmlFor='Bio'>Edit your Bio </label>
          <textarea
            id='Bio'
            name='Bio'
            type='text'
            required
            className='input'
            defaultValue={editBio}
          ></textarea>

          <button type='submit' className='input'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
