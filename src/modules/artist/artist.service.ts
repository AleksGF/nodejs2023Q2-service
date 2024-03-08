import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Artist } from './artist.interface';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.databaseService.artist.findMany();
  }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    return artist;
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return (await this.databaseService.artist.create(dto)) as Artist;
  }

  async deleteArtist(id: string): Promise<Artist> {
    const artist = await this.databaseService.artist.delete({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    return artist;
  }

  async updateArtist(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.databaseService.artist.update({
      where: { id },
      data: dto,
    });

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    return artist;
  }
}
