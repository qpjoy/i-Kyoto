import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  private socketAxiosMap: Map<any, any> = new Map();

  syncClients(clientsMap): void {
    this.socketAxiosMap = clientsMap;
  }

  //   removeClient(clientId: string): void {
  //     this.connectedClients.delete(clientId);
  //   }

  sendMsg({ id, msg }) {
    const userSet = this.socketAxiosMap.get(id + '');
    userSet?.forEach((userSocket) => {
      userSocket.emit('ai', msg);
    });
  }

  sendEnd({ id, msg }) {
    const userSet = this.socketAxiosMap.get(id + '');
    userSet?.forEach((userSocket) => {
      userSocket.emit('end', msg);
    });
  }

  // sendMsgP2P() {

  // }

  getConnectedClients() {
    return this.socketAxiosMap;
  }
}
