import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [DatabaseModule],
  providers: [FavsService],
  controllers: [FavsController],
})
export class FavsModule {}
