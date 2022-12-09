import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { catchError } from 'rxjs';
import { MessageService } from './services/message.service';
import { PersonalMessage } from './types';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit, OnChanges {
  @Input() personal_id = '';
  messages: PersonalMessage[] = [];

  constructor(private messagesService: MessageService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'personal_id') {
        console.log('kuku', value);
        // this.messagesService.get(value)?.subscribe({
        //   next: (res) => {
        //     this.messages = res;
        //     console.log('messages', res);
        //   },
        //   error: catchError,
        // });
      }
    }
  }
}
