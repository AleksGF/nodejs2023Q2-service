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
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './album.interface';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Post()
  createAlbum(
    @Body(new ValidationPipe())
    dto: CreateAlbumDto,
  ): Promise<Album> {
    return this.albumService.createAlbum(dto);
  }

  @Get(':id')
  getAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumService.getAlbumById(id);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe())
    dto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumService.deleteAlbum(id);
  }
}
