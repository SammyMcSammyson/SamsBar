'use client';

import React from 'react';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastError = () => {
  const showToast = () => {
    {
      setTimeout(() => {
        toast.error('You cannot delete this since you did not create it.', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }, 1000);
    }
  };

  return (
    <>
      <button onClick={showToast}>Delete</button>
      <ToastContainer />
    </>
  );
};

export default ToastError;
