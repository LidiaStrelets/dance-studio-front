import { Component, OnInit } from '@angular/core';
import { User, UserForm } from 'src/types';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../services/alert.service';
import { ErrorService } from '../services/error.service';
import { FormService } from '../services/form.service';
import { DateService } from './services/date.service';
import { UsersService } from './services/users.service';
import { FormService as UserFormService } from './services/form.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User = {} as User;
  showDate = false;
  showForm = false;
  showName = false;

  userForm: UserForm = {} as UserForm;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private alertService: AlertService,
    private errorService: ErrorService,
    private dateService: DateService,
    private formFunctionsServise: FormService,
    private formService: UserFormService
  ) {
    this.userForm = formService.getForm();
    this.showForm = true;
  }

  ngOnInit() {
    this.usersService.getById().subscribe({
      next: (res) => {
        this.user = res;

        if (!!this.user.birth_date) {
          this.user.birth_date = this.dateService.convertForPicker(
            new Date(this.user.birth_date)
          );
        }

        this.formService.setInitialValues(this.user);
      },
      error: (err) =>
        this.alertService.presentAlertError(
          this.errorService.generateMessage(err)
        ),
    });
  }

  getBirthDate = () => {
    const date = this.userForm.get('birth_date')?.value;

    if (date === this.dateService.convertForPicker(new Date('2000-12-12'))) {
      return null;
    }

    return date;
  };

  toggleShowDate = () => {
    this.showDate = !this.showDate;
  };

  toggleName = () => {
    this.showName = !this.showName;
  };

  submitPatch = () => {
    if (!this.userForm.dirty || this.userForm.invalid) {
      return;
    }
    this.showDate = false;
    this.showName = false;

    this.usersService
      .patch(this.authService.getCurrentUserId(), this.userForm)
      .subscribe({
        next: () => this.alertService.presentAlertSuccess('User was updated!'),
        error: (err) =>
          this.alertService.presentAlertError(
            this.errorService.generateMessage(err)
          ),
      });
  };

  getValidation = this.formFunctionsServise.getValidation;
  getErrors = this.formFunctionsServise.getErrors;

  inputStyles = this.formFunctionsServise.inputStyles;
}
