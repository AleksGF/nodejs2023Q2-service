import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { compare, hash } from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from './user.interface';
import { convertDateToInt } from './util/convertDateToInt';

const select = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return (
      await this.databaseService.user.findMany({
        select,
      })
    ).map((u) => convertDateToInt(u));
  }

  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return convertDateToInt(user);
  }

  async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;

    const hashedPassword = await hash(dto.password, CRYPT_SALT);

    return convertDateToInt(
      await this.databaseService.user.create({
        data: {
          login: dto.login,
          password: hashedPassword,
        },
        select,
      }),
    );
  }

  async deleteUser(id: string): Promise<Omit<User, 'password'>> {
    try {
      return convertDateToInt(
        await this.databaseService.user.delete({
          where: { id },
          select,
        }),
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(`User with id: ${id} not found`);

      throw e;
    }
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select: { password: true, version: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    const isPasswordMatch = await compare(dto.oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Current password is incorrect');
    }

    const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;

    const hashedPassword = await hash(dto.newPassword, CRYPT_SALT);

    return convertDateToInt(
      await this.databaseService.user.update({
        where: { id },
        data: {
          password: hashedPassword,
          version: user.version + 1,
          updatedAt: new Date(Date.now()),
        },
        select,
      }),
    );
  }
}
