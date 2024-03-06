import { compare, hash } from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto.dto';
import { User } from './user.interface';
import { sanitizeUser } from './utils/sanitizeUser';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.databaseService.user.findMany();

    return users.map((user) => sanitizeUser(user));
  }

  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.databaseService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return sanitizeUser(user);
  }

  async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;

    const hashedPassword = await hash(dto.password, CRYPT_SALT);

    const user = await this.databaseService.user.create({
      ...dto,
      password: hashedPassword,
    });

    return sanitizeUser(user);
  }

  async deleteUser(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.databaseService.user.delete({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return sanitizeUser(user);
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.databaseService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    const isPasswordMatch = await compare(dto.oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Current password is incorrect');
    }

    const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;

    const hashedPassword = await hash(dto.newPassword, CRYPT_SALT);

    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return sanitizeUser(updatedUser);
  }
}
