const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Example: publish notification
function notifyUser(userId, data) {
  publisher.publish(`user:${userId}:notifications`, JSON.stringify(data));
}

// Example: in app.js, subscribe and forward via Socket.IO
subscriber.on('message', (channel, message) => {
  const userId = channel.split(':')[1];
  io.to(userId).emit('notification', JSON.parse(message));
});
subscriber.subscribe('user:*:notifications');
