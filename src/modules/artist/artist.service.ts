import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Artist as ArtistModel } from '@prisma/client';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllArtists(): Promise<ArtistModel[]> {
    return await this.databaseService.artist.findMany();
  }

  async getArtistById(id: string): Promise<ArtistModel> {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    return artist;
  }

  async createArtist(dto: CreateArtistDto): Promise<ArtistModel> {
    return await this.databaseService.artist.create({ data: dto });
  }

  async deleteArtist(id: string): Promise<ArtistModel> {
    try {
      return await this.databaseService.artist.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(`Artist with id: ${id} not found`);

      throw e;
    }
  }

  async updateArtist(id: string, dto: UpdateArtistDto): Promise<ArtistModel> {
    try {
      return await this.databaseService.artist.update({
        where: { id },
        data: dto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(`Artist with id: ${id} not found`);

      throw e;
    }
  }
}
