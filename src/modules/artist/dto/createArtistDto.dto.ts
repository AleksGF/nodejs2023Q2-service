import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
