import { Artist } from '../artist/artist.interface';
import { Album } from '../album/album.interface';
import { Track } from '../track/track.interface';

export interface Favs {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface AllFavs {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
