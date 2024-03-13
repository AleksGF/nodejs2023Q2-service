import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @IsOptional()
  @IsUUID('4')
  albumId: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  duration: number;
}
