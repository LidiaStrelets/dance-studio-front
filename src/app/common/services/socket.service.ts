import { Injectable, OnDestroy } from '@angular/core';
import {
  MessagesSubscriptionCallback,
  PersonalSubscriptionCallback,
  SocketEvents,
} from '@app/common/types/types';
import { PersonalMessage } from '@app/common/types/types';
import { Personal } from '@personalsModule/types/types';
import { environment } from '@root/environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      transports: ['websocket', 'polling'],
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public emitPersonal(personal: Personal) {
    this.socket.emit(SocketEvents.newPersonal, personal);
  }

  public subscribeOnPersonal(callback: PersonalSubscriptionCallback) {
    this.socket.on(SocketEvents.personalCreated, (data: Personal) => {
      callback(data);
    });
  }

  public emitMessage(item: PersonalMessage) {
    this.socket.emit(SocketEvents.newMessage, item);
  }

  public subscribeOnMessage(callback: MessagesSubscriptionCallback) {
    this.socket.on(SocketEvents.messageCreated, (item: PersonalMessage) => {
      callback(item);
    });
  }
}
