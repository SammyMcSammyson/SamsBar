import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/utilities';
import { redirect } from 'next/navigation';
import '../../css/profileme.css';
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
      <h1>Create Profile </h1>
      <p>When you are fininshed just hit Save and you can start posting</p>
      <div className='postContainer'>
        <form action={handleProfile} className='formSubmission'>
          <label htmlFor='UserName'>UserName: &nbsp; &nbsp;</label>
          <input
            id='UserName'
            name='UserName'
            type='text'
            required
            className='input'
            defaultValue={user.username}
            readOnly
          />
          <br></br>
          <label htmlFor='FirstName'>First Name: &nbsp;</label>
          <input
            id='FirstName'
            name='FirstName'
            type='text'
            className='input'
            defaultValue={user?.firstName || ''}
          />
          <br></br>
          <label htmlFor='LastName'>Last Name: &nbsp; </label>
          <input
            id='LastName'
            name='LastName'
            type='text'
            className='input'
            defaultValue={user?.lastName || ''}
          />
          <br></br>
          <label htmlFor='Bio'>Tell us a bit about yourself: </label>
          <textarea
            id='Bio'
            name='Bio'
            type='text'
            required
            className='input'
            defaultValue={`Hi, I am ${user.username} and I love snowboarding.`}
          ></textarea>
          <br></br>
          <button type='submit' className='input1'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
