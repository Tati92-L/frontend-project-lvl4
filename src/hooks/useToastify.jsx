import { useContext } from 'react';
import { ToastifyContext } from '../components/Toastify.jsx';

const useToastify = () => useContext(ToastifyContext);

export default useToastify;
