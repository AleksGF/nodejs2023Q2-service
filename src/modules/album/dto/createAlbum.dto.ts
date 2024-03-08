import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @Min(1900)
  @Max(2029)
  year: number;

  @IsUUID('4')
  artistId: string | null;
}
