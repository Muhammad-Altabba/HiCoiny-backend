import express from 'express';
import controller from './controller';

// export default express
//   .Router()
//   .use('/chat', chatController);
export default express
  .Router()
  .post('/', controller.startChat)
  .get('/', controller.startChat)