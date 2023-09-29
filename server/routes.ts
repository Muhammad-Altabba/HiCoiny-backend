import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import chatRouter from './api/controllers/chat/router';
import socketRouter from './api/controllers/socket/router';
export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/chat', chatRouter);
  app.use('/api/v1/socket', socketRouter);
}
