import socketIO from 'socket.io';
import eventEmitters from './eventEmitters';

const socketIo = (server) => {
  const io = socketIO(server);
  io.use((sockets, next) => {
    if (sockets) {
      sockets.socket = sockets;
      next();
    } else {
      next(new Error('Socket Error'));
    }
  });

  io.on('connection', (socket) => {
    eventEmitters.on('notification_message', (data) => {
      socket.emit('approve_reject', data);
    });
  });
  return io;
};

export default socketIo;
