'use client';
import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DropdownMenuComment = ({ handleDeleteComments, commentId }) => {
  const handleDeleteComment = async () => {
    const formData = new FormData();
    formData.set('commentId', commentId);

    const response = await handleDeleteComments(formData);
    if (response.status === 'success') {
      toast.success('Comment deleted successfully!');
    } else if (response.status === 'computer says no') {
      toast.error(response.message);
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
            onClick={handleDeleteComment}
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

export default DropdownMenuComment;
