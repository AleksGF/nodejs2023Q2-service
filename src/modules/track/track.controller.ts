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
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }

  @Post()
  createTrack(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: CreateTrackDto,
  ): Promise<Track> {
    return this.trackService.createTrack(dto);
  }

  @Get(':id')
  getTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.trackService.getTrackById(id);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.trackService.deleteTrack(id);
  }
}
