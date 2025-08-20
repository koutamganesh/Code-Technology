module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', ({roomId}) => {
      socket.join(roomId);
    });
    socket.on('chatMessage', ({roomId, message, sender}) => {
      // Save message to DB if required, then emit to room
      io.to(roomId).emit('chatMessage', {message, sender});
    });
  });
};
