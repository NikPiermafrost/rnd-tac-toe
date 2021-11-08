import express from 'express';
import http from 'http';
import ws from 'ws';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const gameHub = new ws.WebSocket.Server({ 
  server,
  path: '/game'
});

gameHub.on('connection', (ws) => {
  console.log('client info', ws);
});

app.put('/game/:gameId', (req, res) => {
  const { gameId } = req.params;

  console.log('game info', gameId, req.body);

  res.status(204).send();
});

app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*'
}));


export default server;
