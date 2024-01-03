import express from 'express';
import { createServer } from 'node:http';
import createSocketServer from './utils/socket';
import { AppRequest } from './utils/custom-types';
import lobbyRouter from './routes/lobby.router';
import helmet from 'helmet';
import { handleGameMessages } from './services/game.service';
import cors from 'cors';

const app = express();

const httpServer = createServer(app);

app.use(cors({
  origin: '*'
}));

const io = createSocketServer(httpServer);

handleGameMessages(io);

app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  (req as AppRequest).io = io;
  return next();
});

app.use('/lobby', lobbyRouter);

export default httpServer;