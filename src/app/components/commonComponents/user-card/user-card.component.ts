import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { environment } from '@root/environments/environment';
import { LoaderService } from '@services/loader.service';
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

  constructor(
    private usersService: UsersService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'userId' && value) {
        this.loader.showSpinner();
        this.usersService.getById(value)?.subscribe({
          next: (res) => {
            this.user.next(res);
            this.changes.markForCheck();
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

  getName = () => {
    if (!this.user.value?.id) {
      return;
    }

    return this.user ? this.usersService.getUserName(this.user.value) : '';
  };

  getUser = () => this.user;
}
