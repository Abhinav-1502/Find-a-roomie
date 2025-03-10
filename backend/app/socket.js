import { Server } from 'socket.io';

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust according to your needs
      methods: ["GET", "POST","PUT","DELETE"],
    },
  });

  let roomUserMap = {};

  const updateUserList = (roomName) => {
    // Emit an event to update the user list in the room
    io.to(roomName).emit('roomData', {
      users: Array.from(io.sockets.adapter.rooms.get(roomName) || []).map(socketId => ({ id: socketId, name: roomUserMap[socketId].username })),
    });
  };

  io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => handleJoinRoom(socket, data));
    socket.on('leaveRoom', (data) => handleLeaveRoom(socket, data)); // Handle leaveRoom event
    socket.on('typing', (data) => handleTyping(socket, data));
    socket.on('sendMessage', (data) => handleSendMessage(socket, data));
    socket.on('disconnect', () => handleDisconnect(socket));
  });
  // Separate functions for each event type
  
  function handleJoinRoom(socket, { roomName, username }) {
    // Join the specified room, update user data, and emit a user connected event
    socket.join(roomName);
    roomUserMap[socket.id] = { username, roomName };
    updateUserList(roomName);
    io.to(roomName).emit('userConnected', { userId: socket.id, username });
  }
  
  function handleLeaveRoom(socket, data) {
    const { roomName } = data;
    const { username } = roomUserMap[socket.id] || {};
    if (roomUserMap[socket.id] && roomUserMap[socket.id].roomName === roomName) {
      socket.leave(roomName);
      updateUserList(roomName);
      io.to(roomName).emit('userDisconnected', { userId: socket.id, username });
      delete roomUserMap[socket.id];
    }
  }
  
  function handleTyping(socket, { roomName, username, isTyping }) {
    // Broadcast the typing status to all users in the room
    io.to(roomName).emit('typing', { username, isTyping });
  }
  
  function handleSendMessage(socket, { roomName, messageData }) {
    // Send a message to the specified room with a timestamp
    const timestamp = new Date();
    messageData.timestamp = timestamp;
    io.to(roomName).emit('message', messageData);
  }
  
  function handleDisconnect(socket) {
    // Handle user disconnection, leave rooms, update user data, and emit user disconnected events
    const { username, roomName } = roomUserMap[socket.id] || {};
    if (roomName) {
      const rooms = socket.rooms;
      rooms.forEach((room) => {
        socket.leave(room);
        updateUserList(room);
        io.to(room).emit('userDisconnected', { userId: socket.id, username });
      });
      delete roomUserMap[socket.id];
    }
  }

  return io;
}

export default initializeSocket;
