import { User } from '../user.interface';

export const sanitizeUser = (user: User): Omit<User, 'password'> => {
  if (!user || typeof user !== 'object' || !('password' in user)) return user;

  const { password, ...sanitizedUser } = user;

  return password ? sanitizedUser : sanitizedUser;
};
