import { compare, hash } from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User as UserModel } from '@prisma/client';

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

  async getAllUsers(): Promise<Omit<UserModel, 'password'>[]> {
    return await this.databaseService.user.findMany({
      select,
    });
  }

  async getUserById(id: string): Promise<Omit<UserModel, 'password'>> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<Omit<UserModel, 'password'>> {
    const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;

    const hashedPassword = await hash(dto.password, CRYPT_SALT);

    return await this.databaseService.user.create({
      data: {
        login: dto.login,
        password: hashedPassword,
      },
      select,
    });
  }

  async deleteUser(id: string): Promise<Omit<UserModel, 'password'>> {
    const user = await this.databaseService.user.delete({
      where: { id },
      select,
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select: { password: true },
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

    return await this.databaseService.user.update({
      where: { id },
      data: { password: hashedPassword },
      select,
    });
  }
}
