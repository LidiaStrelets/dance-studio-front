import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { Common } from 'src/common';
import {
  LoginData,
  LoginForm,
  LoginFormFields,
  TLoginFormFields,
} from 'src/types';
import { BeService } from './be.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  routerLink = ['../', 'register'];

  loginFormFields = LoginFormFields;
  loginForm: LoginForm = {} as LoginForm;
  showForm = false;

  inputStyles = {};

  constructor(
    private common: Common,
    private formService: LoginService,
    private be: BeService,
    private alertService: AlertService
  ) {
    this.inputStyles = this.common.inputStyles;
  }

  handleSubmit = () => {
    if (
      Object.keys(this.loginForm.value).some(
        (key) => !this.loginForm.get(key)?.value
      )
    ) {
      return;
    }

    this.be.register(this.loginForm.value as LoginData).subscribe(
      (res) => console.log('success', res),
      (err) => this.alertService.presentAlertConfirm(err.error[0].message)
    );
  };

  ngOnInit() {
    this.loginForm = this.formService.getForm();
    this.showForm = true;
  }

  getValidation = (field: TLoginFormFields) => {
    const fieldValue = this.loginForm.get(field);

    return {
      blockHighlight: fieldValue?.invalid && fieldValue?.untouched,
      showMessage: fieldValue?.invalid && fieldValue?.touched,
    };
  };

  getErrors = (field: TLoginFormFields) => {
    const fieldValue = this.loginForm.get(field);

    return fieldValue?.errors ?? {};
  };
}
