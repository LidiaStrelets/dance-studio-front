import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { routesPaths } from 'src/app/app-routing.module';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';
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
    private authService: AuthService,
    private formFunctionsServise: FormService,
    private loader: LoaderService
  ) {}

  handleSubmit = () => {
    if (this.loginForm.invalid) {
      return;
    }
    this.loader.showSpinner();
    this.be.register(this.loginForm.value as LoginData).subscribe({
      next: (res) => {
        this.authService.authenticate(res.data.token);
        this.loader.hideSpinner();
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
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
