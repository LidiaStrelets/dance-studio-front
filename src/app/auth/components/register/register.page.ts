import { Component, OnInit } from '@angular/core';
import { routesPaths } from 'src/app/app-routing.module';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import {
  RegistrationData,
  RegistrationForm,
  RegistrationFormFields,
  Roles,
} from 'src/types';
import { AuthService } from '../../services/auth.service';
import { BeService } from '../../services/services/be.service';
import { RegisterService } from '../../services/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  roles = [Roles.admin, Roles.client, Roles.coach];

  registrationFormFields = RegistrationFormFields;
  registrationForm: RegistrationForm = {} as RegistrationForm;
  showForm = false;

  routerLink = ['../', routesPaths.login];

  constructor(
    private formService: RegisterService,
    private be: BeService,
    private alertService: AlertService,
    private authService: AuthService,
    private errorService: ErrorService,
    private formFunctionsServise: FormService
  ) {}

  handleSubmit = () => {
    if (
      Object.keys(this.registrationForm.value).some(
        (key) =>
          !this.registrationForm.get(key)?.value &&
          key !== this.registrationFormFields.adminKey
      )
    ) {
      return;
    }

    this.be
      .register(this.registrationForm.value as RegistrationData)
      .subscribe({
        next: (res) => this.authService.authenticate(res.data.token),
        error: (err) =>
          this.alertService.presentAlertError(
            this.errorService.generateMessage(err)
          ),
      });
  };

  ngOnInit() {
    this.authService.redirectAuthenticated();
    this.registrationForm = this.formService.getForm();
    this.showForm = true;
  }

  getValidation = this.formFunctionsServise.getValidation;
  getErrors = this.formFunctionsServise.getErrors;

  inputStyles = this.formFunctionsServise.inputStyles;
  keyInputStyles = this.formFunctionsServise.keyInputStyles;

  showKeyError = () => {
    const key = this.registrationForm.get(this.registrationFormFields.adminKey);
    const errors = this.registrationForm.errors;
    if (!errors) {
      return false;
    }

    return key?.touched && errors['keyRequired'];
  };
}
