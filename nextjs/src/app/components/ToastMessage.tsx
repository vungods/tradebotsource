import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastMessageProps{
  type: 'success'|'warning'|'error'
  content: string,
  classname: string
}

export default function ToastMessage({ type, content, classname }: ToastMessageProps) {
  toast(
    content, 
    {
      type: type,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );

  return (
    <div>
      <ToastContainer />
    </div>
  );
}