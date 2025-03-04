import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { RedisService } from '@liaoliaots/nestjs-redis';
import axios, { AxiosInstance } from 'axios';
import decodeJWT from 'src/utils/auth/jwtUtil';
import { User } from '../users/entities/user.entity';
import { Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SocketService } from 'src/shared/socket/socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

// io.set("heartbeat interval", 5000);
// io.set("heartbeat timeout", 60000);
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private socketAxiosMap: Map<any, any> = new Map();

  constructor(
    private readonly socketService: SocketService,
    private readonly redisService: RedisService, // private readonly aiService: AiService,
    private readonly usersService: UsersService, // @Inject('UsersRepository')
    // private readonly user: User,
  ) {}
  // constructor(private readonly user: ) {}

  async handleConnection(socket: any) {
    const { token } = socket.handshake.query;
    // if (!token) {
    //   return;
    // }
    console.log(`[connection]: `, socket.id, typeof token, token);
    if (!token || token === 'undefined') {
      return;
    }
    const decoded = decodeJWT({ token });

    const user = await this.usersService.getUserByEmail(decoded.email);
    if (!user) {
      return;
    }
    socket.user = user;
    console.log(`[decodeJWT]`, decoded, user.id);

    const userID = user.id + '';
    let userSockets = this.socketAxiosMap.get(userID);
    if (!userSockets) {
      userSockets = new Set();
      this.socketAxiosMap.set(userID, userSockets);
    }
    userSockets.add(socket);

    console.log(
      `[socket connection]: ${socket.id}, [maps]: `,
      this.socketAxiosMap,
    );
    this.socketService.syncClients(this.socketAxiosMap);

    socket.on('authenticated', function () {
      //do other things
      console.log(`Hello! ${socket.decoded_token.name}`);
    });

    // 断开时，清理数据
    socket.on('disconnect', () => {
      console.log(`Client disconnected with ID: ${socket.id}`);

      // Remove the client ID from the connectedClients Set
      userSockets.delete(socket.id);
      this.socketService.syncClients(this.socketAxiosMap);
    });
  }

  @SubscribeMessage('ai')
  async ai(@MessageBody() data: any) {
    this.server.emit('aiReceived', {});
  }

  // // redis 分页展示
  // @SubscribeMessage('wishes')
  // async wishes(@MessageBody() data: any) {
  //   // let pagination = {};
  //   const all = data?.all;
  //   let pagination = data?.pagination;
  //   if (!pagination) {
  //     pagination = {
  //       page: 0,
  //       rowsPerPage: 10,
  //     };
  //   } else {
  //     pagination = data.pagination;
  //   }

  //   const params = all
  //     ? {
  //         pagination,
  //         all,
  //       }
  //     : {
  //         pagination,
  //       };
  //   const { count, rows } = await this.getWishes(params);

  //   const wishRes = {
  //     count,
  //     rows: rows.map(JSON.parse),
  //   };
  //   console.log(`[existing_wishes]: `, rows, wishRes);
  //   this.server.emit('wishes', wishRes);
  // }

  // // @SubscribeMessage('existing_wishes')
  // // async exsitingWishes(@MessageBody() data: string) {
  // //   const wishes = await this.getWishes({
  // //     pagination: {
  // //       page: 0,
  // //       rowsPerPage: 10,
  // //     },
  // //   });
  // //   console.log(`[existing_wishes]: `, wishes);
  // //   this.server.emit('existing_wishes', wishes.map(JSON.parse));
  // // }

  // @SubscribeMessage('add_wish')
  // async wish(@MessageBody() data: string) {
  //   // this.server.emit('wish', data);
  //   console.log(`[add wish]: `, data);
  //   await this.storeWishes(JSON.stringify(data));
  //   return data;
  // }

  // @SubscribeMessage('make_wish')
  // async makeWish(@MessageBody() data: string) {
  //   // this.server.emit('wish', data);
  //   console.log(`[make wish]: `, data);
  //   await this.storeWishes(JSON.stringify(data));
  //   return data;
  // }

  // @SubscribeMessage('minimax')
  // async getMinimax(client: any, payload: any) {
  //   // this.server.emit('wish', data);
  //   console.log(`[Get minimax]: `, client.id, payload, this.queryMap);
  //   // await this.storeWishes(JSON.stringify(data));
  //   // this.server.emit('minimax', data);
  //   if (this.socketAxiosMap.get(client.id)) {
  //     const asked: any = await this.askMinimax({
  //       id: client.id,
  //       msg: payload.text,
  //     });
  //     console.log(`[socket axios map]: `, asked);
  //     if (asked.code === 0) {
  //       this.server.emit('minimax', asked?.data);
  //       return;
  //     } else {
  //       this.server.emit('minimax', {
  //         code: -1,
  //         msg: 'other code',
  //         status: asked.status,
  //       });
  //       return;
  //     }
  //   }
  //   this.server.emit('minimax', {
  //     code: -1,
  //     msg: 'groupId or authorization error, pls reset.',
  //   });
  // }
  // // @SubscribeMessage('minimax')
  // // async getMinimax(@MessageBody() data: string) {
  // //   // this.server.emit('wish', data);
  // //   console.log(`[Get minimax]: `, this.server.engine.);
  // //   // await this.storeWishes(JSON.stringify(data));
  // //   this.server.emit('minimax', data);
  // //   this.askMinimax(data);
  // //   return data;
  // // }

  // private async askMinimax({ id, msg }) {
  //   try {
  //     const minimaxRes = await this.socketAxiosMap.get(id).post('', {
  //       model: 'abab5.5-chat',
  //       bot_setting: [
  //         {
  //           bot_name: 'MM智能助理',
  //           content:
  //             'MM智能助理是一款由MiniMax自研的，没有调用其他产品的接口的大型语言模型。MiniMax是一家中国科技公司，一直致力于进行大模型相关的研究。',
  //         },
  //       ],
  //       messages: [
  //         {
  //           sender_type: 'USER',
  //           sender_name: '小明',
  //           text: msg,
  //         },
  //       ],
  //       reply_constraints: {
  //         sender_type: 'BOT',
  //         sender_name: 'MM智能助理',
  //       },
  //       tokens_to_generate: 1034,
  //       temperature: 0.01,
  //       top_p: 0.95,
  //       // stream: true,
  //     });
  //     console.log(`[ask minimax]: `, msg, minimaxRes);
  //     if (minimaxRes.status === 200) {
  //       return Promise.resolve({
  //         code: 0,
  //         data: minimaxRes.data,
  //         msg: '请求成功',
  //       });
  //     } else {
  //       return Promise.resolve({
  //         code: -1,
  //         status: minimaxRes.status,
  //         msg: '其他问题',
  //       });
  //     }
  //   } catch (e) {
  //     return Promise.resolve({
  //       code: -1,
  //       err: e,
  //       msg: '聊天出错！',
  //     });
  //   }
  // }

  // private async askMinimaxStream({ id, msg }) {
  //   try {
  //     const minimaxRes = await this.socketAxiosMap.get(id).post('', {
  //       model: 'abab5.5-chat',
  //       bot_setting: [
  //         {
  //           bot_name: 'MM智能助理',
  //           content:
  //             'MM智能助理是一款由MiniMax自研的，没有调用其他产品的接口的大型语言模型。MiniMax是一家中国科技公司，一直致力于进行大模型相关的研究。',
  //         },
  //       ],
  //       messages: [
  //         {
  //           sender_type: 'USER',
  //           sender_name: '小明',
  //           text: msg,
  //         },
  //       ],
  //       reply_constraints: {
  //         sender_type: 'BOT',
  //         sender_name: 'MM智能助理',
  //       },
  //       tokens_to_generate: 1034,
  //       temperature: 0.01,
  //       top_p: 0.95,
  //       // stream: true,
  //     });
  //     console.log(`[ask minimax]: `, msg, minimaxRes);
  //     if (minimaxRes.status === 200) {
  //       return Promise.resolve({
  //         code: 0,
  //         data: minimaxRes.data,
  //         msg: '请求成功',
  //       });
  //     } else {
  //       return Promise.resolve({
  //         code: -1,
  //         status: minimaxRes.status,
  //         msg: '其他问题',
  //       });
  //     }
  //   } catch (e) {
  //     return Promise.resolve({
  //       code: -1,
  //       err: e,
  //       msg: '聊天出错！',
  //     });
  //   }
  // }

  // private async storeWishes(message: string) {
  //   const redisClient = this.redisService.getClient();
  //   await redisClient.lpush('barrage_messages', message);
  // }

  // private broadcastMessage(message: string) {
  //   this.server.emit('message', message);
  // }

  // // Publish new message and store it
  // private async publishAndStoreMessage(message) {
  //   await this.storeWishes(message);
  //   const redisClient = this.redisService.getClient();
  //   await redisClient.publish('barrage_messages', message);
  // }

  // private async getWishes({ pagination, all }: any) {
  //   const { rowsPerPage, page } = pagination;
  //   let start = page * rowsPerPage;
  //   let end = start + rowsPerPage - 1;
  //   const redisClient = this.redisService.getClient();
  //   const wishLength = await redisClient.llen('barrage_messages');
  //   if (end >= wishLength) {
  //     end = wishLength - 1;
  //   }

  //   if (all) {
  //     start = 0;
  //     end = -1;
  //   }

  //   const wishes: any = await redisClient.lrange(
  //     'barrage_messages',
  //     start,
  //     end,
  //   );
  //   console.log(`[get wishes]: `, wishes);
  //   return Promise.resolve({
  //     count: wishLength,
  //     rows: wishes,
  //   });
  // }
}
