import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { SocketService } from '@services/socket.service';
import { catchError } from 'rxjs';
import { MessageService } from './services/message.service';
import { PersonalMessage } from './types';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnChanges {
  @Input() personal_id = '';
  messages: PersonalMessage[] = [];

  constructor(
    private messagesService: MessageService,
    private socketService: SocketService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.socketService.subscribeOnMessage((item: PersonalMessage) => {
      if (item.personal_id !== this.personal_id) {
        return;
      }

      this.messages = [...this.messages, item];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'personal_id') {
        this.loader.showSpinner();
        this.messagesService.get(value)?.subscribe({
          next: (res) => {
            this.messages = res;
            this.loader.hideSpinner();
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
        });
      }
    }
  }
}
