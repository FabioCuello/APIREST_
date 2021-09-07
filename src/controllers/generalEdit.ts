import { getCustomRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import { usersSchemaWithRequired } from '../validation';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../repositories/users';
import { catchAsync } from '../middlewares/error';
import { RequireToken } from '../middlewares/auth';
import { APP_SECRET } from '../config';

const router = Router();

router.put(
  '/users/:id',
  catchAsync(RequireToken),
  catchAsync(async (req: Request, res: Response) => {
    // request validation
    const validation = usersSchemaWithRequired.validate(req.body, {
      abortEarly: false,
    });
    if (validation.error)
      return res.status(401).json({
        error: validation.error.details[0].message,
      });

    const idRequest = req.params.id;
    const userRepository = getCustomRepository(UserRepository);
    let user = await userRepository.findOne(idRequest);

    // Case User already doesn't exists
    if (!user) {
      return res.status(404).json({
        error: `User doesn't exits`,
      });
    }

    // Case update User
    const token = sign(req.body, APP_SECRET, {
      expiresIn: '1d',
    });
    const updateQuery = await userRepository.save(
      Object.assign(user, { ...req.body, token })
    );

    if (!updateQuery) {
      return res.status(422).json({
        error: 'Please try again',
      });
    }

    delete user.password;
    return res.status(201).json(user);
  })
);

export { router as generalEdit };
