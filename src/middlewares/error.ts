import { Request, Response, NextFunction } from 'express';

export const catchAsync = (handler: (...args) => Promise<any>) => {
  return (...args: [Request, Response, NextFunction]) =>
    handler(...args).catch(args[2]);
};
