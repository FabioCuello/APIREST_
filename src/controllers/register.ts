import { getCustomRepository, getRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import { usersSchemaWithRequired } from '../validation';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../repositories/users';
import { catchAsync } from '../middlewares/error';
import { APP_SECRET } from '../config';

const router = Router();

router.post(
  '/users',
  catchAsync(async (req: Request, res: Response) => {
    // request validation
    const validation = usersSchemaWithRequired.validate(req.body, {
      abortEarly: false,
    });
    if (validation.error)
      return res.status(401).json({
        success: false,
        error: validation.error.details[0].message,
      });

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(req.body.email);

    // Case User already exists
    if (user) {
      return res.status(422).json({
        error: 'User al ready exists',
      });
    }

    // Case create new User
    const token = sign(req.body, APP_SECRET, {
      expiresIn: '1d',
    });

    let newUser: any = userRepository.create({
      ...req.body,
      token,
    });

    await userRepository.save(newUser);

    delete newUser.password;
    return res.status(201).json(newUser);
  })
);

export { router as register };
