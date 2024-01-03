import { BaseResponse } from '../models/common.model';
import { Request, Response } from 'express';
import lobbySrv from '../services/lobby.service';
import { Room } from '../models/room.model';

export const getLobby = async (req: Request, res: Response) => {
  try {
    const lobby = await lobbySrv.getLobby();
    res.status(200).json({
      status: 'success',
      data: lobby
    } as BaseResponse<Room[]>);
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      message: (error as Error)?.message
    } as BaseResponse<null>);
  }
};

export const getLobbyDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lobbyDetail = await lobbySrv.getLobbyDetail(id);
    res.status(200).json({
      status: 'success',
      data: lobbyDetail
    } as BaseResponse<Room>);
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      message: (error as Error)?.message
    } as BaseResponse<null>);
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const body: Room = req.body;
    await lobbySrv.createNewRoom(body);
    res.status(200).json({
      status: 'success',
      data: true
    } as BaseResponse<boolean>);
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      message: (error as Error)?.message
    } as BaseResponse<null>);
  }
};

export default {
  getLobby,
  getLobbyDetail,
  createGame
};