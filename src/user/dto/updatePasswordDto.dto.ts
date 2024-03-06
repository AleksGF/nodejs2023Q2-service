import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  newPassword: string;
}
