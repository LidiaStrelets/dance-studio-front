import { Component, OnInit } from '@angular/core';
import { routesPaths } from 'src/app/app-routing.module';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';
import { LoginData, LoginForm, LoginFormFields } from 'src/types';
import { AuthService } from '../auth.service';
import { BeService } from './services/be.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  routerLink = ['../', routesPaths.register];

  loginFormFields = LoginFormFields;
  loginForm: LoginForm = {} as LoginForm;
  showForm = false;

  constructor(
    private formService: LoginService,
    private be: BeService,
    private alertService: AlertService,
    private authService: AuthService,
    private errorService: ErrorService,
    private formFunctionsServise: FormService
  ) {}

  handleSubmit = () => {
    if (
      Object.keys(this.loginForm.value).some(
        (key) => !this.loginForm.get(key)?.value
      )
    ) {
      return;
    }

    this.be.register(this.loginForm.value as LoginData).subscribe(
      (res) => {
        this.authService.authenticate(res.data.token);
      },
      (err) =>
        this.alertService.presentAlertError(
          this.errorService.generateMessage(err)
        )
    );
  };

  ngOnInit() {
    this.authService.redirectAuthenticated();
    this.loginForm = this.formService.getForm();
    this.showForm = true;
  }

  getValidation = this.formFunctionsServise.getValidation;
  getErrors = this.formFunctionsServise.getErrors;

  inputStyles = this.formFunctionsServise.inputStyles;
}
