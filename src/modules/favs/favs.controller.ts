import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getFavs() {
    return this.favsService.getFavs();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteTrackFromFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteAlbumFromFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteArtistFromFavs(id);
  }
}
