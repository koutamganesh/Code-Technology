import { useEffect } from 'react';
import { io } from "socket.io-client";
const socket = io('http://localhost:5000');

function Notifications({ userId }) {
  useEffect(() => {
    socket.on('notification', (data) => {
      alert(`Notification: ${data.message}`);
    });
    return () => socket.off('notification');
  }, [userId]);
  return null;
}
