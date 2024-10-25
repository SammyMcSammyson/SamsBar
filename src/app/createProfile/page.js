import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/utilities';
import { redirect } from 'next/navigation';

export default async function createProfile() {
  const { userId } = await auth();
  const user = await currentUser();
  console.log('this is user', user.username);
  console.log('this is user ID', userId);

  async function handleProfile(formData) {
    'use server';
    console.log('Saving post to the database...');

    const FirstName = formData.get('FirstName');
    const LastName = formData.get('LastName');
    const UserName = formData.get('UserName');
    const Bio = formData.get('Bio');

    await db.query(
      `INSERT INTO userid (username, last_name, first_name, bio)
          VALUES ($1, $2, $3, $4)    `,
      [UserName, LastName, FirstName, Bio]
    );

    console.log('Save working');
    redirect(`/posts`);
  }

  return (
    <div>
      <h1>Testing</h1>
      <h2>Create Profile </h2>
      <div>
        <form action={handleProfile} className='formSubmission'>
          <label htmlFor='UserName'>UserName </label>
          <input
            id='UserName'
            name='UserName'
            type='text'
            required
            className='input'
            defaultValue={user.username}
            readOnly
          />

          <label htmlFor='FirstName'>First Name </label>
          <input
            id='FirstName'
            name='FirstName'
            type='text'
            className='input'
            defaultValue={user?.firstName || ''}
          />
          <label htmlFor='LastName'>Last Name </label>
          <input
            id='LastName'
            name='LastName'
            type='text'
            className='input'
            defaultValue={user?.lastName || ''}
          />

          <label htmlFor='Bio'>Tell us a bit about yourself </label>
          <textarea
            id='Bio'
            name='Bio'
            type='text'
            required
            className='input'
            defaultValue={`Hi, I am ${user.username} and I love snowboarding.`}
          ></textarea>

          <button type='submit' className='input'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
