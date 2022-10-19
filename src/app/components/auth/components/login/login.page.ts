import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routesPaths } from 'src/app/app-routing.module';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { LoginData, LoginForm, LoginFormFields } from 'src/types';
import { AuthService } from '../../services/auth.service';
import { BeService } from '../../services/login.services/be.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  routerLink = ['../', routesPaths.register];

  loginFormFields = LoginFormFields;
  loginForm: LoginForm = {} as LoginForm;

  constructor(
    private be: BeService,
    private alertService: AlertService,
    private authService: AuthService,
    private errorService: ErrorService,
    private formFunctionsServise: FormService
  ) {}

  handleSubmit = () => {
    if (this.loginForm.invalid) {
      return;
    }

    this.be.register(this.loginForm.value as LoginData).subscribe({
      next: (res) => {
        this.authService.authenticate(res.data.token);
      },
      error: (err) =>
        this.alertService.presentAlertError(
          this.errorService.generateMessage(err)
        ),
    });
  };

  ngOnInit() {
    this.authService.redirectAuthenticated();
    this.loginForm = new FormGroup({
      [LoginFormFields.email]: new FormControl('marina@i.ua', [
        Validators.required,
        Validators.email,
      ]),
      [LoginFormFields.password]: new FormControl('qwertyQ1', [
        Validators.required,
      ]),
    });
  }

  getValidation = this.formFunctionsServise.getValidation;
  getErrors = this.formFunctionsServise.getErrors;

  inputStyles = this.formFunctionsServise.inputStyles;
}