import { SignUpButton } from '@clerk/nextjs';
import '../css/home.css';

export default function HomePage() {
  return (
    <>
      <h1>Chalet Sam</h1>
      <h2>Announcements</h2>
      <p> Chalet Sam is opening its doors this December in Val Thorens!</p>
      <p>
        Come stay for only €40 per night and enjoy the highest ski resort in
        Europe without breaking the bank. However if you break your liver thats
        on you.
      </p>
      <p> I will even throw in a free beer on arrival. </p>

      <p>
        You do not want to stay? Not a problem! Join us on the slopes and for
        some apres. Or come for the family dinner and some drinking games — yes,
        that means even more free beer!
      </p>

      <button> Click here to Book </button>

      <h2> Don't want to stay but still want to hang out. Not a problem.</h2>

      <p>
        Feel free to check out our posts and see what everyone's up to—there's
        always something happening. Join in on the fun and connect with other
        solo travellers.
      </p>

      <p>
        If nothing takes your fancy sign up and leave a post and make your own
        group to cruise around on the slopes.
      </p>

      <SignUpButton mode='modal'>Sign Up</SignUpButton>
    </>
  );
}
