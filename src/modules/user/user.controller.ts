import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.createUser(dto);
  }

  @Get(':id')
  getUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.updateUserPassword(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.deleteUser(id);
  }
}
