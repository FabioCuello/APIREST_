import { getRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import { catchAsync } from '../middlewares/error';
import { User } from '../entities/users';
import { RequireToken } from '../middlewares/auth';

const router = Router();

router.get(
  '/users/:id',
  catchAsync(RequireToken),
  catchAsync(async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: `User doesn't exits`,
      });
    }

    delete user.password;
    res.status(200).json(user);
  })
);

export { router as getOne };
