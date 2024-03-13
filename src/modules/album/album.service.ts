import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './album.interface';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.databaseService.album.findMany();
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    return album;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    return (await this.databaseService.album.create(dto)) as unknown as Album;
  }

  async deleteAlbum(id: string): Promise<Album> {
    const album = await this.databaseService.album.delete({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    return album;
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.databaseService.album.update({
      where: { id },
      data: dto,
    });

    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    return album;
  }
}
