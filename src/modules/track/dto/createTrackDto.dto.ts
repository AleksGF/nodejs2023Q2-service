import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsUUID('4')
  artistId: string | null;

  @IsUUID('4')
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  duration: number;
}
