import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User, { IUser } from '../models/User';
import { registerValidator, loginValidator } from '../validators/inputValidation';

const router = Router();

router.post(
  '/register',
  registerValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, isAdmin } = req.body as IUser;
    if (await User.exists({ email })) {
      return res.status(403).json({ message: 'Email in use.' });
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hash,
        username,
        isAdmin: !!isAdmin
      });
      return res.json(newUser);
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  '/login',
  loginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body as { email: string; password: string };
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: 'Incorrect password.' });
      }

      const token = jwt.sign(
        { _id: user.id, username: user.username, isAdmin: user.isAdmin },
        process.env.SECRET!,
        { expiresIn: '1h' }
      );
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
