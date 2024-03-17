import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track as TrackModel } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllTracks(): Promise<TrackModel[]> {
    return await this.databaseService.track.findMany();
  }

  async getTrackById(id: string): Promise<TrackModel> {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<TrackModel> {
    return await this.databaseService.track.create({
      data: dto,
    });
  }

  async deleteTrack(id: string): Promise<TrackModel> {
    try {
      return await this.databaseService.track.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(`Track with id: ${id} not found`);

      throw e;
    }
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<TrackModel> {
    try {
      return await this.databaseService.track.update({
        where: { id },
        data: dto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(`Track with id: ${id} not found`);

      throw e;
    }
  }
}
