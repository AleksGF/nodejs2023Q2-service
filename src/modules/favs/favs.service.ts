import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../album/album.interface';
import { Artist } from '../artist/artist.interface';
import { DatabaseService } from '../database/database.service';
import { Track } from '../track/track.interface';
import { AllFavs, Favs } from './favs.interface';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFavs(): Promise<AllFavs> {
    const favsArtists =
      (await this.databaseService.favoriteArtist.findMany()) as string[];
    const favsAlbums =
      (await this.databaseService.favoriteAlbum.findMany()) as string[];
    const favsTracks =
      (await this.databaseService.favoriteTrack.findMany()) as string[];

    const artists = (await this.databaseService.artist.findMany({
      where: { id: { in: favsArtists } },
    })) as unknown as Artist[];

    const albums = (await this.databaseService.album.findMany({
      where: { id: { in: favsAlbums } },
    })) as unknown as Album[];

    const tracks = (await this.databaseService.track.findMany({
      where: { id: { in: favsTracks } },
    })) as unknown as Track[];

    return { artists, albums, tracks };
  }

  async addTrackToFavs(id: string): Promise<Favs> {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    const artists =
      (await this.databaseService.favoriteArtist.findMany()) as string[];
    const albums =
      (await this.databaseService.favoriteAlbum.findMany()) as string[];
    const favsTracks =
      (await this.databaseService.favoriteTrack.findMany()) as string[];

    const updatedTracks = [...favsTracks.filter((t) => t !== id), id];

    const tracks = (await this.databaseService.favoriteTrack.replaceWith(
      updatedTracks,
    )) as string[];

    return { artists, albums, tracks };
  }

  async deleteTrackFromFavs(id: string): Promise<Favs> {
    const favsTracks =
      (await this.databaseService.favoriteTrack.findMany()) as string[];

    if (!favsTracks.includes(id)) {
      throw new NotFoundException(
        `Track with id: ${id} not found in favorites`,
      );
    }

    const artists =
      (await this.databaseService.favoriteArtist.findMany()) as string[];
    const albums =
      (await this.databaseService.favoriteAlbum.findMany()) as string[];

    const updatedTracks = favsTracks.filter((t) => t !== id);

    const tracks = (await this.databaseService.favoriteTrack.replaceWith(
      updatedTracks,
    )) as string[];

    return { artists, albums, tracks };
  }

  async addAlbumToFavs(id: string): Promise<Favs> {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    const artists =
      (await this.databaseService.favoriteArtist.findMany()) as string[];
    const tracks =
      (await this.databaseService.favoriteTrack.findMany()) as string[];
    const favsAlbums =
      (await this.databaseService.favoriteAlbum.findMany()) as string[];

    const updatedAlbums = [...favsAlbums.filter((a) => a !== id), id];

    const albums = (await this.databaseService.favoriteAlbum.replaceWith(
      updatedAlbums,
    )) as string[];

    return { artists, albums, tracks };
  }

  async deleteAlbumFromFavs(id: string): Promise<Favs> {
    const favsAlbums =
      (await this.databaseService.favoriteAlbum.findMany()) as string[];

    if (!favsAlbums.includes(id)) {
      throw new NotFoundException(
        `Album with id: ${id} not found in favorites`,
      );
    }

    const artists =
      (await this.databaseService.favoriteArtist.findMany()) as string[];
    const tracks =
      (await this.databaseService.favoriteTrack.findMany()) as string[];

    const updatedAlbums = favsAlbums.filter((a) => a !== id);

    const albums = (await this.databaseService.favoriteAlbum.replaceWith(
      updatedAlbums,
    )) as string[];

    return { artists, albums, tracks };
  }

  async addArtistToFavs(id: string): Promise<Favs> {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    const tracks =
      (await this.databaseService.favoriteTrack.findMany()) as string[];
    const albums =
      (await this.databaseService.favoriteAlbum.findMany()) as string[];
    const favsArtists =
      (await this.databaseService.favoriteArtist.findMany()) as string[];

    const updatedArtists = [...favsArtists.filter((a) => a !== id), id];

    const artists = (await this.databaseService.favoriteArtist.replaceWith(
      updatedArtists,
    )) as string[];

    return { artists, albums, tracks };
  }

  async deleteArtistFromFavs(id: string): Promise<Favs> {
    const favsArtists =
      (await this.databaseService.favoriteArtist.findMany()) as string[];

    if (!favsArtists.includes(id)) {
      throw new NotFoundException(
        `Artist with id: ${id} not found in favorites`,
      );
    }

    const tracks =
      (await this.databaseService.favoriteTrack.findMany()) as string[];
    const albums =
      (await this.databaseService.favoriteAlbum.findMany()) as string[];

    const updatedArtists = favsArtists.filter((a) => a !== id);

    const artists = (await this.databaseService.favoriteArtist.replaceWith(
      updatedArtists,
    )) as string[];

    return { artists, albums, tracks };
  }
}
