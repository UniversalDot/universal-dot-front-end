import { toast as toastify } from 'react-toastify';
import { toastTypes } from '../types';

const useToast = () => {
  const options = {
    position: 'bottom-center',
    hideProgressBar: true,
  };
  const toast = (message, type) => {
    if (type === toastTypes.INFO) {
      toastify.info(message, options);
    }

    if (type === toastTypes.SUCCESS) {
      toastify.success(message, options);
    }

    if (type === toastTypes.WARNING) {
      toastify.warn(message, options);
    }

    if (type === toastTypes.ERROR) {
      toastify.error(message, options);
    }
  };

  return {
    toast,
  };
};

export { useToast };
