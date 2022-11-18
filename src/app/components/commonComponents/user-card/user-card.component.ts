import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { environment } from '@root/environments/environment';
import { UsersService } from '@userModule/services/users.service';
import { User } from '@userModule/types';
import { BehaviorSubject, catchError } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit, OnChanges {
  @Input() userId!: string;
  user = new BehaviorSubject<User | undefined>(undefined);

  avatar = `${environment.basicUrl}no_photo.webp`;

  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;
      // console.log('change', value, propName);

      if (propName === 'userId' && value) {
        this.usersService.getById(value)?.subscribe({
          next: (res) => {
            this.user.next(res);
            // = res;
            console.log('next', res);
          },
          error: catchError,
        });
      }
    }
  }

  getName = () => {
    // console.log('test');

    if (!this.user.value?.id) {
      return;
    }
    // console.log('getName', this.user);

    return this.user ? this.usersService.getUserName(this.user.value) : '';
  };

  getUser = () => this.user;

  test = () => {
    console.log('check render');
  };
}
