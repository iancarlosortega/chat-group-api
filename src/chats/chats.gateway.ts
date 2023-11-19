import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { ChatsService } from './chats.service';

@WebSocketGateway({ cors: true })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatsService: ChatsService) {}

  @WebSocketServer() server: Server = new Server();

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('send_message')
  async handleChatEvent(
    @MessageBody() payload: { message: string; roomId: string },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const user = await this.chatsService.getUserFromSocket(socket);
    const message = {
      id: uuidv4(),
      content: payload.message,
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.server.to(payload.roomId).emit('receive_message', message); // broadcast messages
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`${socket.id} is joining ${roomId}`);
    this.server.in(socket.id).socketsJoin(roomId);
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`${socket.id} is leaving ${roomId}`);
    this.server.in(socket.id).socketsLeave(roomId);
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
