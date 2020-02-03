import socketIO from 'socket.io';
import { sendNotification } from './notificationConfig';

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
  sendNotification(io, 'approve_reject_notification', 'approve_reject_client');
  sendNotification(io, 'edit_trip_notification', 'edit_trip_client');
  sendNotification(io, 'post_comment_notification', 'post_comment_client');
  sendNotification(io, 'booking_notification', 'booking_client');
  sendNotification(io, 'trip_request_notification', 'trip_request_client');
  return io;
};

export default socketIo;
