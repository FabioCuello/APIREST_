import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import {
  register,
  login,
  generalEdit,
  partialEdit,
  getAll,
  getOne,
  deleteOne,
} from './controllers/';

export const createApp = () => {
  const app = express();

  // middlewares
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(403).json({
        error:
          "Request should have 'Content-Type' header with value 'application/json'",
      });
    }
    return next();
  });

  // routes
  app.use(register);
  app.use(login);
  app.use(generalEdit);
  app.use(partialEdit);
  app.use(getAll);
  app.use(getOne);
  app.use(deleteOne);

  app.use((_: Request, res: Response) => {
    return res.status(200).json({
      error: 'Not found',
    });
  });

  // error
  app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
    console.log('Upsssss');
    response.status(500).json({
      error: `Internal error: ${err.stack}`,
    });
  });

  return app;
};
