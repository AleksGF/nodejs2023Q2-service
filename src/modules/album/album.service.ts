import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album as AlbumModel } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllAlbums(): Promise<AlbumModel[]> {
    return await this.databaseService.album.findMany();
  }

  async getAlbumById(id: string): Promise<AlbumModel> {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    return album;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<AlbumModel> {
    return await this.databaseService.album.create({ data: dto });
  }

  async deleteAlbum(id: string): Promise<AlbumModel> {
    try {
      return await this.databaseService.album.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(`Album with id: ${id} not found`);

      throw e;
    }
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto): Promise<AlbumModel> {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: dto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(`Album with id: ${id} not found`);

      throw e;
    }
  }
}
