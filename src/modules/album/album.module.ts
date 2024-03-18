import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [DatabaseModule],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
