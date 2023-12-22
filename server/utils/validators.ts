import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodRawShape, z } from 'zod';
import { BaseResponse } from '../models/common.model';

const validateRequestBody = (req: Request, res: Response, next: NextFunction, schema: ZodObject<ZodRawShape>) => {
  try {
    const { body } = req;
    schema.parse(body);
    next();
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: (error as Error)?.message
    } as BaseResponse<null>);
  }
};

const validateRequestParameters = (req: Request, res: Response, next: NextFunction, schema: ZodObject<ZodRawShape>) => {
  try {
    const { params } = req;
    schema.parse(params);
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'failure',
      
      message: (error as Error)?.message
    } as BaseResponse<null>);
  }
};

export const validateNewRoom = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    gameId: z.string().uuid(),
    playerName: z.string().min(3).max(20)
  });
  validateRequestBody(req, res, next, schema);
};

export const validateRoomExists = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    id: z.string().uuid()
  });
  validateRequestParameters(req, res, next, schema);
};