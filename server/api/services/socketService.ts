import { Socket } from 'socket.io';

// In-memory array to store socket data
const sockets: Socket[] = [];

export function handleConnection(socket: Socket) {
  // Store socket in the array
  console.log('received a socket', socket)
  sockets.push(socket);

  // Listen for chat messages
  socket.on('chat message', (msg: string) => {
    // Broadcast the message to all connected sockets (excluding the sender)
    socket.broadcast.emit('chat message', msg);
  });

  // Listen for chat messages
  socket.on('message', (msg: string) => {
    // Broadcast the message to all connected sockets (excluding the sender)
    socket.broadcast.emit('message', msg);
  });

  // Remove socket from the array when disconnected
  socket.on('disconnect', () => {
    const index = sockets.indexOf(socket);
    if (index !== -1) {
      sockets.splice(index, 1);
    }
  });
}
