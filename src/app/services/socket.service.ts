import { Injectable, OnDestroy } from '@angular/core';
import { SocketEvents } from '@app/types';
import { PersonalMessage } from '@commonComponents/messages/types';
import { Personal } from '@personalsModule/types';
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

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  emitPersonal(personal: Personal) {
    this.socket.emit(SocketEvents.newPersonal, personal);
  }

  subscribeOnPersonal(callback: (item: Personal) => void) {
    this.socket.on(SocketEvents.personalCreated, (data: Personal) => {
      callback(data);
    });
  }

  emitMessage(item: PersonalMessage) {
    this.socket.emit(SocketEvents.newMessage, item);
  }

  subscribeOnMessage(callback: (item: PersonalMessage) => void) {
    this.socket.on(SocketEvents.messageCreated, (item: PersonalMessage) => {
      callback(item);
    });
  }
}
