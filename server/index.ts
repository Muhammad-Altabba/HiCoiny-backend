import './common/env';
import ExpressServer, {httpServer} from './common/server';
import {createSocket} from './common/socket';
import routes from './routes';

const port = parseInt(process.env.PORT ?? '3000');
export default new ExpressServer().router(routes).listen(port);

createSocket(httpServer);