import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer: React.FC = () => {
  return <ReactToastContainer data-testid="toast-container" />;
};

export default ToastContainer;
