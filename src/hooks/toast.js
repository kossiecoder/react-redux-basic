import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addToast as add } from '../store/toastSlice';
import { useDispatch } from 'react-redux';

const useToast = () => {
  const [, setToastRerender] = useState(false);
  const toasts = useRef([]);
  const dispatch = useDispatch();

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

    dispatch(add(toastWithId));
    // toasts.current = [...toasts.current, toastWithId];
    // setToastRerender(prev => !prev);
    
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