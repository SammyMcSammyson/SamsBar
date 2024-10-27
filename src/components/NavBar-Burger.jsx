import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import '../css/NavBarBurger.css';

const BurgerMenu = ({ user }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='burgerButton'>≡</DropdownMenu.Trigger>

      <DropdownMenu.Content className='dropdownContent'>
        <DropdownMenu.Item>
          <Link href='/'>Home</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href='/posts'>Posts</Link>
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <Link href='/profile/me'>Profile</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href='/submission'>Add Post</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <SignOutButton className='signout'>Sign Out</SignOutButton>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default BurgerMenu;
