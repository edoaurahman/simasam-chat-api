import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { EventService } from './event.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly eventService: EventService) {}
  private readonly logger = new Logger(EventGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Event Gateway Initialized');
  }

  handleConnection(client: any) {
    const { sockets } = this.server.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  message(
    @MessageBody('username') username: string,
    @MessageBody('name') name: string,
    @MessageBody('message') message: string,
    @MessageBody('time') time: string,
    @ConnectedSocket() client: Socket,
  ) {
    // send message to all clients except the sender
    const messageData = {
      username,
      name,
      message,
      time,
    };
    client.broadcast.emit('message', messageData);
    this.eventService.saveMessage(messageData);
  }
}
