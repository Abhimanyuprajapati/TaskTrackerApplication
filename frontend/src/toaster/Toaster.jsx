import toast from 'react-hot-toast';

const Toaster = (message, type) => {
  const setting = {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#e24585',
      color: '#fff'
    },
  };
  switch (type) {
    case "success":
      return toast.success(message, setting);
    case "failure":
    case "error":
      return toast.error(message, setting);
    default:
      return toast(message, setting);
  }
};

export default Toaster;
