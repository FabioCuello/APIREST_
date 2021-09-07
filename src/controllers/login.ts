import { getCustomRepository, getRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import { UserRepository } from '../repositories/users';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../middlewares/error';
import { APP_SECRET } from '../config';

const router = Router();

router.post(
  '/login',
  catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user || !(await user.PasswordIsValid(password))) {
      return res.status(401).json({
        error: 'Error in user or password',
      });
    }

    const token = jwt.sign(req.body, APP_SECRET, {
      expiresIn: '1d',
    });

    const findedUser = await userRepository.save({
      ...user,
      token,
    });

    delete findedUser.password;
    res.status(200).json(findedUser);
  })
);

export { router as login };
