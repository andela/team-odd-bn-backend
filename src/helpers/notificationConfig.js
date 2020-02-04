import eventEmitters from './eventEmitters';

const notificationEvents = (eventName, clientData) => {
  eventEmitters.emit(eventName, JSON.stringify(clientData));
};

const sendNotification = (io, socketEvent, connectedClients, data) => {
  if (connectedClients[data.userId.toString()]) {
    connectedClients[data.userId.toString()].forEach(client => {
      io.to(client).emit(socketEvent, data);
    });
  }
};

export {
  notificationEvents,
  sendNotification
};
