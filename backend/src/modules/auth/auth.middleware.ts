import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { RevokedToken } from '@model';

export const authenticateUserByJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err: unknown, user: unknown) => {
      if (err || !user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const isRevoked = await RevokedToken.findOne({ where: { token } });
      if (isRevoked) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      req.user = user;
      next();
    },
  )(req, res, next);
};
