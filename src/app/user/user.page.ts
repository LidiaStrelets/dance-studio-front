import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserForm } from 'src/types';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../services/alert.service';
import { ErrorService } from '../services/error.service';
import { FormService } from '../services/form.service';
import { DateService } from './services/date.service';
import { UsersService } from './services/users.service';

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
    private formFunctionsServise: FormService
  ) {
    this.userForm = new FormGroup({
      birth_date: new FormControl(
        this.dateService.convertForPicker(new Date('2000-12-12'))
      ),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
    });
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

        this.userForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
        });
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
    // this.usersService
    //   .patch(this.authService.getCurrentUserId(), this.user)
    //   .subscribe({
    //     next: () => (this.isDirty = false),
    //     error: (err) =>
    //       this.alertService.presentAlertError(
    //         this.errorService.generateMessage(err)
    //       ),
    //   });
  };

  getValidation = this.formFunctionsServise.getValidation;
  getErrors = this.formFunctionsServise.getErrors;

  inputStyles = this.formFunctionsServise.inputStyles;
}
