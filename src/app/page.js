import '../css/home.css';
import { SignInButton, SignUpButton, SignedOut } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <div className='masterHomeContainer'>
      <div className='announcementContainer'>
        <h2>Announcements</h2>
        <p> Chalet Sam is opening its doors this December in Val Thorens!</p>
        <p>
          Come stay for only €40 per night and enjoy the highest ski resort in
          Europe while also testing your liver edurance.
        </p>
        <p> I will even throw in a free beer on arrival. </p>

        <button> Click here to Book </button>
      </div>
      <SignedOut>
        <h2> Don't want to stay but still want to hang out. Not a problem.</h2>
        <p>
          Join us on the slopes or for some apres. Feel free to come for the
          family dinner and play some drinking games — yes, that means even more
          free beer!
        </p>
        <p>
          Want to hang out with other peeps, join in on the fun and connect with
          other solo travellers by signing up and leaving a post.
        </p>
        <SignUpButton mode='modal'>Sign Up</SignUpButton>
      </SignedOut>
    </div>
  );
}
