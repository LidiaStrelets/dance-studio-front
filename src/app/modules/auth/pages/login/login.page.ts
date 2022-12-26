import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { routesPaths } from '@app/app-routing.module';
import { FormService } from '@services/form.service';
import { LoaderService } from '@services/loader.service';
import { LoginData, LoginFormFields } from '@authModule/types/types';
import { AuthService } from '@authModule/services/auth.service';
import { BeService } from '@authModule/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  public routerLink = ['../', routesPaths.register];
  public loginFormFields = LoginFormFields;
  public loginForm;
  public inputStyles;
  public emailField;
  public passwordField;

  constructor(
    private be: BeService,
    private authService: AuthService,
    private formFunctionsService: FormService,
    private loader: LoaderService,
    private builder: FormBuilder
  ) {
    this.loginForm = this.builder.group({
      [LoginFormFields.email]: ['', [Validators.required, Validators.email]],
      [LoginFormFields.password]: ['', [Validators.required]],
    });
    this.emailField = this.loginForm.get(this.loginFormFields.email);
    this.passwordField = this.loginForm.get(this.loginFormFields.password);

    this.inputStyles = this.formFunctionsService.inputStyles;
  }

  ngOnInit() {
    this.authService.redirectAuthenticated();
  }

  public handleSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loader.showSpinner();
    this.be.register(this.loginForm.value as LoginData).subscribe({
      next: (res) => {
        this.authService.authenticate(res.data.token);
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }
}
