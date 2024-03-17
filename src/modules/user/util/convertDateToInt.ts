import { User as UserModel } from '@prisma/client';
import { User } from '../user.interface';

export const convertDateToInt = (
  instance: Omit<UserModel, 'password'>,
): Omit<User, 'password'> => ({
  ...instance,
  createdAt: Date.parse(instance.createdAt.toISOString()),
  updatedAt: Date.parse(instance.updatedAt.toISOString()),
});
