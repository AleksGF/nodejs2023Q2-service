import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AlbumModule } from './modules/album/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { DatabaseModule } from './modules/database/database.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, ArtistModule, TrackModule, AlbumModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
