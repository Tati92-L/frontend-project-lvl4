import { useContext } from 'react';
import { SocketContext } from '../components/Socket.jsx';

const useSocket = () => useContext(SocketContext);

export default useSocket;
