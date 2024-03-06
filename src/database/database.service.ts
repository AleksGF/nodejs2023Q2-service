import { Injectable } from '@nestjs/common';
import { DB } from '../inMemoryDb/DB';

@Injectable()
export class DatabaseService extends DB {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
