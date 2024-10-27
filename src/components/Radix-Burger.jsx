'use client';
import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DropdownMenuPost = ({ handleDelete, postId }) => {
  const handleDeletePost = async () => {
    const formData = new FormData();
    formData.set('postId', postId);
    const response = await handleDelete(formData);

    await handleDelete(formData);
    if (response.status === 'it works') {
      toast.success('Post deleted');
    } else if (response.status === 'computer says no') {
      toast.error(response.message || 'You can only delete your own comments.');
    }
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className='IconButton'>
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className='dropdown-content' sideOffset={5}>
          <DropdownMenu.Item
            onClick={handleDeletePost}
            className='dropdown-item delete-option'
          >
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ToastContainer />
    </>
  );
};

export default DropdownMenuPost;
