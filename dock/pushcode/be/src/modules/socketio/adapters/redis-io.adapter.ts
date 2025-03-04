import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';

import config from 'config';

console.log(`[redis-io adapter]:`, config);

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    try {
      const pubClient = new Redis({
        ...config.redis,
        db: 0,
      });
      const subClient = pubClient.duplicate();

      this.adapterConstructor = createAdapter(pubClient, subClient);
    } catch (e) {
      console.log(e);
    }
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
