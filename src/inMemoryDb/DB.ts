import { v4 as uuidv4 } from 'uuid';
import { Album, Artist, Favorites, Track, User } from './types/';

interface dataDB {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}

export class DB {
  private _db: dataDB | null;

  async $findMany(modelName: string, data?: { where: Record<string, any> }) {
    const model = this.$getModel(modelName);

    if (!data || !data?.where) return [...model];

    const { where } = data;

    return model.filter((item: Record<string, any>) => {
      for (const key in where) {
        const condition = where[key];

        if (typeof condition === 'object' && condition.hasOwnProperty('in')) {
          if (
            !Array.isArray(condition.in) ||
            !condition.in.includes(item[key])
          ) {
            return false;
          }
        } else {
          if (item[key] !== condition) {
            return false;
          }
        }
      }

      return true;
    });
  }

  async $findUnique(
    modelName: string,
    { where }: { where: Record<string, any> },
  ) {
    const model = this.$getModel(modelName);

    return (
      model.find((item: Record<string, any>) => {
        for (const key in where) {
          if (item[key] !== where[key]) {
            return false;
          }
        }

        return true;
      }) ?? null
    );
  }

  async $create(modelName: string, data: Record<string, any>) {
    const model = this.$getModel(modelName);

    const id = uuidv4();
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    if (modelName === 'users') {
      const user = {
        ...(data as { login: string; password: string }),
        id,
        version,
        createdAt,
        updatedAt,
      };
      model.push(user);

      return user;
    }

    if (modelName === 'artists') {
      const artist = {
        ...(data as { name: string; grammy: boolean }),
        id,
      };
      model.push(artist);

      return artist;
    }
  }

  async $update(
    modelName: string,
    { where, data }: { where: Record<string, any>; data: Record<string, any> },
  ) {
    const model = this.$getModel(modelName);

    const index = model.findIndex((item: Record<string, any>) => {
      for (const key in where) {
        if (item[key] !== where[key]) return false;
      }

      return true;
    });

    if (index === -1) return null;

    const updatedItem = {
      ...model[index],
      ...data,
    };

    if (modelName === 'users') {
      updatedItem.version = updatedItem.version + 1;
      updatedItem.updatedAt = Date.now();
    }

    model[index] = updatedItem;

    return updatedItem;
  }

  async $delete(modelName: string, { where }: { where: Record<string, any> }) {
    const model = this.$getModel(modelName);

    const index = model.findIndex((item: Record<string, any>) => {
      for (const key in where) {
        if (item[key] !== where[key]) {
          return false;
        }
      }

      return true;
    });

    if (index === -1) return null;

    return model.splice(index, 1)[0];
  }

  async $replaceWith(modelName: string, data: string[]) {
    const model = this.$getModel(modelName);

    model.splice(0, model.length, ...data);

    return model;
  }

  private $checkConnection() {
    if (!this._db) {
      throw new Error('Database not connected');
    }
  }

  private $getModel(modelName: string) {
    this.$checkConnection();
    let model: any[];

    if (modelName.startsWith('favorites.')) {
      model = this._db.favorites[modelName.split('.')[1]];
    } else {
      model = this._db[modelName];
    }

    if (!model) {
      throw new Error(`Model '${modelName}' not found`);
    }

    return model;
  }

  private $generateMethods(modelName: string) {
    return {
      findMany: (data?: { where: Record<string, any> }) =>
        this.$findMany(modelName, data),
      findUnique: (data: { where: Record<string, any> }) =>
        this.$findUnique(modelName, data),
      create: (data: Record<string, any>) => this.$create(modelName, data),
      update: (data: {
        where: Record<string, any>;
        data: Record<string, any>;
      }) => this.$update(modelName, data),
      delete: (data: { where: Record<string, any> }) =>
        this.$delete(modelName, data),
      replaceWith: (data: string[]) => this.$replaceWith(modelName, data),
    };
  }

  // TODO: Add Generics to have returned types???
  get user() {
    return this.$generateMethods('users');
  }

  get artist() {
    return this.$generateMethods('artists');
  }

  get track() {
    return this.$generateMethods('tracks');
  }

  get album() {
    return this.$generateMethods('albums');
  }

  get favoriteArtist() {
    return this.$generateMethods('favorites.artists');
  }

  get favoriteAlbum() {
    return this.$generateMethods('favorites.artists');
  }

  get favoriteTrack() {
    return this.$generateMethods('favorites.artists');
  }

  async $connect() {
    this._db = {
      users: [],
      artists: [],
      tracks: [],
      albums: [],
      favorites: {
        artists: [],
        albums: [],
        tracks: [],
      },
    };
  }

  async $disconnect() {
    this._db = null;
  }
}
