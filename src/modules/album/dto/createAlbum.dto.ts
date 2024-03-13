import {
  IsInt,
  IsNotEmpty,
  IsOptional,
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

  @IsOptional()
  @IsUUID('4')
  artistId: string | null;
}
