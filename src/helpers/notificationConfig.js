import eventEmitters from './eventEmitters';

const notificationEvents = (eventName, clientData) => {
  eventEmitters.emit(eventName, JSON.stringify(clientData));
};

const sendNotification = (io, emitterEvent, socketEvent) => {
  io.on('connection', (socket) => {
    eventEmitters.on(emitterEvent, (data) => {
      socket.emit(socketEvent, data);
    });
  });
};

export {
  notificationEvents,
  sendNotification
};
