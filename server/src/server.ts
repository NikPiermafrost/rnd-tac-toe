import express from 'express';
import cors from 'cors';
import initializeSignalrHub from './hubs/game-hub';

const app = express();

initializeSignalrHub();

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


export default app;
