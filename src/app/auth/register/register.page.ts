import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Common } from 'src/common';
import {
  RegistrationData,
  RegistrationForm,
  RegistrationFormFields,
  Roles,
  TRegistrationFormFields,
} from 'src/types';
import { AuthService } from '../auth.service';
import { BeService } from './be.service';
import { RegisterService } from './register.service';

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

  routerLink = ['../', 'login'];

  inputStyles = {};
  keyInputStyles = {};

  constructor(
    private formService: RegisterService,
    private be: BeService,
    private common: Common,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.inputStyles = this.common.inputStyles;
    this.keyInputStyles = this.common.keyInputStyles;
  }

  handleSubmit = () => {
    if (
      Object.keys(this.registrationForm.value).some(
        (key) =>
          !this.registrationForm.get(key)?.value &&
          key !== this.registrationFormFields.key
      )
    ) {
      return;
    }

    this.be.register(this.registrationForm.value as RegistrationData).subscribe(
      (res) => this.authService.authenticate(res.data.token),
      (err) => this.alertService.presentAlertError(err.error[0].message)
    );
  };

  ngOnInit() {
    this.registrationForm = this.formService.getForm();
    this.showForm = true;
  }

  getValidation = (field: TRegistrationFormFields) => {
    const fieldValue = this.registrationForm.get(field);

    return {
      blockHighlight: fieldValue?.invalid && fieldValue?.untouched,
      showMessage: fieldValue?.invalid && fieldValue?.touched,
    };
  };

  getErrors = (field: TRegistrationFormFields) => {
    const fieldValue = this.registrationForm.get(field);

    return fieldValue?.errors ?? {};
  };

  showKeyError = () => {
    const key = this.registrationForm.get(this.registrationFormFields.key);
    const errors = this.registrationForm.errors;
    if (!errors) {
      return false;
    }

    return key?.touched && errors['keyRequired'];
  };
}
