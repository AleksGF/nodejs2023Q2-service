import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  grammy?: boolean;
}
