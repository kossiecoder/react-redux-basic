import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useToast = () => {
  const [, setToastRerender] = useState(false);
  const toasts = useRef([]);

  const deleteToast = (id) => {
    const filteredToasts = toasts.current.filter(toast => {
      return toast.id !== id;
    });

    toasts.current = filteredToasts;
    setToastRerender(prev => !prev);
  }

  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = {
      ...toast,
      id
    }

    toasts.current = [...toasts.current, toastWithId];
    setToastRerender(prev => !prev);
    
    setTimeout(() => {
      deleteToast(id, toasts, setToastRerender);
    }, 5000);
  };

  return [
    toasts.current,
    addToast,
    deleteToast
  ];
};

export default useToast;