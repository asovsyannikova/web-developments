import jwt from 'jsonwebtoken';

export const createJwtToken = (userId: number) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '14d',
  });

  return token;
};
