import express from 'express';
import { validateNewRoom, validateRoomExists } from '../utils/validators';

const router = express.Router();

router.route('/get-lobby')
  .get(async (req, res) => {
    res.status(200).json([]);
  });

router.route('/get-lobby/:id')
  .get(validateRoomExists, async (req, res) => {
    res.status(200).json(true);
  });

router.route('/create-game')
  .post(validateNewRoom, async (req, res) => {
    res.status(200).json(true);
  });

export default router;