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
import { Artist } from './artist.interface';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtistDto.dto';
import { UpdateArtistDto } from './dto/updateArtistDto.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Post()
  createArtist(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.createArtist(dto);
  }

  @Get(':id')
  getArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistService.getArtistById(id);
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistService.deleteArtist(id);
  }
}
