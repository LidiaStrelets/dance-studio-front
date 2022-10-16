import { Component, OnInit } from '@angular/core';
import { User } from 'src/types';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../services/alert.service';
import { ErrorService } from '../services/error.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User = {} as User;
  isBirthDate = false;
  isDescription = false;
  showDate = false;
  isDirty = false;
  // userForm: UserForm = {} as UserForm;
  date: String = new Date().toISOString();

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private alertService: AlertService,
    private errorService: ErrorService
  ) {
    // this.userForm = new FormGroup({
    //   date: new FormControl(''),
    // });
  }

  ngOnInit() {
    this.usersService.getById().subscribe({
      next: (res) => {
        this.user = res;
        this.isBirthDate = !!this.user.birth_date;
        this.isDescription = !!this.user.information;

        if (this.isBirthDate) {
          this.user.birth_date = new Date(this.user.birth_date)
            .toISOString()
            .split('T')[0];
        }
      },
      error: (err) =>
        this.alertService.presentAlertError(
          this.errorService.generateMessage(err)
        ),
    });
  }

  handleDate = (date: String) => {
    this.user.birth_date = date.split('T')[0];
    this.showDate = false;
    this.isDirty = true;
    this.isBirthDate = true;
  };

  toggleShowDate = () => {
    this.showDate = !this.showDate;
  };

  submitPatch = () => {
    this.usersService
      .patch(this.authService.getCurrentUserId(), this.user)
      .subscribe({
        next: () => (this.isDirty = false),
        error: (err) =>
          this.alertService.presentAlertError(
            this.errorService.generateMessage(err)
          ),
      });
  };
}
