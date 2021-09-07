import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/users';

export const RequireToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeaders = req.headers.authorization;
  const token = Array.isArray(tokenHeaders) ? tokenHeaders[0] : tokenHeaders;
  if (!token) {
    return res.status(401).json({
      error: 'No token provided',
    });
  }
  const userRepositore = getCustomRepository(UserRepository);
  const user = await userRepositore.findByToken(token);

  if (!user) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }

  next();
};
