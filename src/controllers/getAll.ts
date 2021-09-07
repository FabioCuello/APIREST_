import { getRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import { catchAsync } from '../middlewares/error';
import { User } from '../entities/users';
import { RequireToken } from '../middlewares/auth';

const router = Router();

router.get(
  '/users',
  catchAsync(RequireToken),
  catchAsync(async (_: Request, res: Response) => {
    const userRepository = getRepository(User);
    const allUsers = await userRepository.find({});
    const allUsersFormat = allUsers.map((user) => {
      delete user.password;
      return user;
    });

    res.status(200).json(allUsersFormat);
  })
);

export { router as getAll };
