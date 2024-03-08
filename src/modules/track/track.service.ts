import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTrackDto } from './dto/createTrackDto.dto';
import { UpdateTrackDto } from './dto/updateTrackDto.dto';
import { Track } from './track.interface';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.databaseService.track.findMany();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    return (await this.databaseService.track.create(dto)) as unknown as Track;
  }

  async deleteTrack(id: string): Promise<Track> {
    const track = await this.databaseService.track.delete({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    return track;
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<Track> {
    const track = await this.databaseService.track.update({
      where: { id },
      data: dto,
    });

    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    return track;
  }
}
