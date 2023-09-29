import http from 'http';
import { Server, Socket } from 'socket.io';
import { RegisteredUser } from './interfaces';

export const connectedClients: { [did: string]: Socket } = {}; // To maintain a list of connected clients
export const registeredUsers: { [did: string]: RegisteredUser } = {}; // To maintain a list of registered users

export function createSocket(httpServer: http.Server) {
  console.info('Creating Socket server at /api/v1/socket');

  const io = new Server(httpServer, {
    path: '/api/v1/socket',
    cors: {
      origin: '*', // or use something like: ['http://localhost:8080']
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('A client has connected!\n\tSocket ID:', socket.id);

    // // Add the connected client to the list
    // connectedClients[socket.id] = socket;

    socket.emit('socketId', socket.id, (err: Error, responses: any) => {
      if (err) {
        console.error('     error at emit', err); // one response per client
        // some clients did not acknowledge the event in the given delay
      } else {
        console.log('response from emit', responses); // one response per client
      }
    });

    // Event handler for client registration
    socket.on('register', (registrationData: RegisteredUser) => {
      console.log('received a register', registrationData);
      // Store the registration data for the client
      registeredUsers[registrationData.decentralizedID] = registrationData;
      connectedClients[registrationData.decentralizedID] = socket;

      // emit new registered users to all other users.
      // [later, this will be made available at an API endpoint]
      io.emit(
        'newRegisteredUser',
        registrationData,
        (err: Error, responses: any) => {
          if (err) {
            // console.error('     error at emit', err); // one response per client
            // some clients did not acknowledge the event in the given delay
          } else {
            console.log('response from emit', responses); // one response per client
          }
        }
      );
    });

    // Event handler for sending a message to a specific user
    // [later, this will be made available at an API endpoint]
    socket.on(
      'sendMessageToUser',
      (args: {
        data: { message: string };
        metadata: { signature: string; senderDid: string; receiverDid: string };
      }) => {
        console.log('A message will be sent from a user to another', args);
        const recipientSocket = connectedClients[args.metadata.receiverDid];
        if (recipientSocket) {
          // TODO: Verify the message signature
          
          // Send the message to the recipient
          recipientSocket.emit('messageFromPeer', args);
        } else {
          console.error('Could not find the identified peer')
        }
      }
    );

    socket.on('message1', (obj: any) => {
      console.log('Received a Message from client', obj); // one response per client
    });

    // io.timeout(1000).emit('message', "message emitted from server", (err: Error, responses: any) => {
    //   if (err) {
    //     // console.error('     error at emit', err); // one response per client
    //     // some clients did not acknowledge the event in the given delay
    //   } else {
    //     console.log('response from emit',responses); // one response per client
    //   }
    // });
  });

  io.on('disconnected', (args: any[]) => {
    console.log('disconnected', args);
  });
}
