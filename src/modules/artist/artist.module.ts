import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
