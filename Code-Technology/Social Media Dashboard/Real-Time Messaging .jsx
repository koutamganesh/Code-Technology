import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
const socket = io('http://localhost:5000');

function Chat({roomId, user}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    socket.emit('joinRoom', { roomId });
    socket.on('chatMessage', msg => setMessages(msgs => [...msgs, msg]));
    return () => socket.off('chatMessage');
  }, [roomId]);
  const sendMsg = () => {
    socket.emit('chatMessage', {roomId, message: input, sender: user});
    setInput('');
  };
  return (<>
    <div>{messages.map((m, i) => <div key={i}>{m.sender}: {m.message}</div>)}</div>
    <input value={input} onChange={e => setInput(e.target.value)} />
    <button onClick={sendMsg}>Send</button>
  </>);
}
