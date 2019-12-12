import socketIO from 'socket.io';
import { sendNotification } from './notificationConfig';

const socketIo = (server) => {
  const io = socketIO(server);
  sendNotification(io, 'approve_reject_notification', 'approve_reject_client');
  sendNotification(io, 'edit_trip_notification', 'edit_trip_client');
  sendNotification(io, 'post_comment_notification', 'post_comment_client');
  return io;
};

export default socketIo;
