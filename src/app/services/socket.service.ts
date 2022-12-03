import { Injectable, OnDestroy } from '@angular/core';
import { Personal, PersonalSchedule } from '@personalsModule/types';
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

  emitPersonal(personal: Personal) {
    this.socket.emit('new-personal', personal);
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  subscribeOnPersonal(callback: (item: PersonalSchedule) => void) {
    this.socket.on('personal-created', (data: PersonalSchedule) => {
      callback(data);
    });
  }
}
