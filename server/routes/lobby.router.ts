import express from 'express';
import { validateNewRoom, validateRoomExists } from '../utils/validators';
import lobbyController from '../controllers/lobby.controller';

const router = express.Router();

router.route('/get-lobby')
  .get(lobbyController.getLobby);

router.route('/get-lobby/:id')
  .get(validateRoomExists, lobbyController.getLobbyDetail);

router.route('/create-game')
  .post(validateNewRoom, lobbyController.createGame);

export default router;