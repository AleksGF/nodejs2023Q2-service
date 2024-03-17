import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Favs } from './favs.interface';
import {
  Artist as ArtistModel,
  Album as AlbumModel,
  Track as TrackModel,
} from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFavs(): Promise<{
    artists: ArtistModel[];
    albums: AlbumModel[];
    tracks: TrackModel[];
  }> {
    const artists = (
      await this.databaseService.favoritesArtists.findMany({
        select: { artist: true },
      })
    ).map((a) => a.artist);

    const albums = (
      await this.databaseService.favoritesAlbums.findMany({
        select: { album: true },
      })
    ).map((a) => a.album);

    const tracks = (
      await this.databaseService.favoritesTracks.findMany({
        select: { track: true },
      })
    ).map((t) => t.track);

    return { artists, albums, tracks };
  }

  async getFavsIds(): Promise<Favs> {
    const artists = (
      await this.databaseService.favoritesArtists.findMany({
        select: { artistId: true },
      })
    ).map((a) => a.artistId);

    const albums = (
      await this.databaseService.favoritesAlbums.findMany({
        select: { albumId: true },
      })
    ).map((a) => a.albumId);

    const tracks = (
      await this.databaseService.favoritesTracks.findMany({
        select: { trackId: true },
      })
    ).map((t) => t.trackId);

    return { artists, albums, tracks };
  }
  async addTrackToFavs(id: string): Promise<Favs> {
    try {
      await this.databaseService.favoritesTracks.create({
        data: {
          trackId: id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw new UnprocessableEntityException(
          `Track with id: ${id} not found`,
        );

      if (!(e instanceof PrismaClientKnownRequestError) || e.code !== 'P2002')
        throw e;
    }

    return await this.getFavsIds();
  }

  async deleteTrackFromFavs(id: string): Promise<Favs> {
    try {
      await this.databaseService.favoritesTracks.delete({
        where: { trackId: id },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(
          `Track with id: ${id} not found in favorites`,
        );

      throw e;
    }

    return await this.getFavsIds();
  }

  async addAlbumToFavs(id: string): Promise<Favs> {
    try {
      await this.databaseService.favoritesAlbums.create({
        data: {
          albumId: id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw new UnprocessableEntityException(
          `Album with id: ${id} not found`,
        );

      if (!(e instanceof PrismaClientKnownRequestError) || e.code !== 'P2002')
        throw e;
    }

    return await this.getFavsIds();
  }

  async deleteAlbumFromFavs(id: string): Promise<Favs> {
    try {
      await this.databaseService.favoritesAlbums.delete({
        where: { albumId: id },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(
          `Album with id: ${id} not found in favorites`,
        );

      throw e;
    }

    return await this.getFavsIds();
  }

  async addArtistToFavs(id: string): Promise<Favs> {
    try {
      await this.databaseService.favoritesArtists.create({
        data: {
          artistId: id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw new UnprocessableEntityException(
          `Artist with id: ${id} not found`,
        );

      if (!(e instanceof PrismaClientKnownRequestError) || e.code !== 'P2002')
        throw e;
    }

    return await this.getFavsIds();
  }

  async deleteArtistFromFavs(id: string): Promise<Favs> {
    try {
      await this.databaseService.favoritesArtists.delete({
        where: { artistId: id },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw new NotFoundException(
          `Artist with id: ${id} not found in favorites`,
        );

      throw e;
    }

    return await this.getFavsIds();
  }
}
