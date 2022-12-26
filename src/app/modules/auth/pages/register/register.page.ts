import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { routesPaths } from '@app/app-routing.module';
import { FormService } from '@services/form.service';
import { LoaderService } from '@services/loader.service';
import {
  RegistrationData,
  RegistrationFormFields,
} from '@authModule/types/types';
import { CustomValidators } from '@root/validation-functions';
import { AuthService } from '@authModule/services/auth.service';
import { BeService } from '@authModule/services/register.service';
import { Roles } from '@userModule/types/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage implements OnInit {
  public roles = [Roles.admin, Roles.client, Roles.coach];
  public registrationFormFields = RegistrationFormFields;
  public registrationForm;
  public routerLink = ['../', routesPaths.login];
  public inputStyles;
  public keyInputStyles;
  public emailField;
  public passwordField;
  public firstnameField;
  public lastnameField;
  public roleField;
  public keyField;

  constructor(
    private customValidators: CustomValidators,
    private be: BeService,
    private authService: AuthService,
    private formFunctionsServise: FormService,
    private loader: LoaderService,
    private builder: FormBuilder
  ) {
    this.registrationForm = this.builder.group(
      {
        [RegistrationFormFields.email]: [
          '',
          [Validators.required, Validators.email],
        ],
        [RegistrationFormFields.password]: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'
            ),
          ],
        ],
        [RegistrationFormFields.firstname]: ['', Validators.required],
        [RegistrationFormFields.lastname]: ['', Validators.required],
        [RegistrationFormFields.role]: [''],
        [RegistrationFormFields.adminKey]: [''],
      },
      { validators: this.customValidators.keyValidator() }
    );
    this.emailField = this.registrationForm.get(
      this.registrationFormFields.email
    );
    this.passwordField = this.registrationForm.get(
      this.registrationFormFields.password
    );
    this.firstnameField = this.registrationForm.get(
      this.registrationFormFields.firstname
    );
    this.lastnameField = this.registrationForm.get(
      this.registrationFormFields.lastname
    );
    this.roleField = this.registrationForm.get(
      this.registrationFormFields.role
    );
    this.keyField = this.registrationForm.get(
      this.registrationFormFields.adminKey
    );

    this.inputStyles = this.formFunctionsServise.inputStyles;
    this.keyInputStyles = this.formFunctionsServise.keyInputStyles;
  }

  ngOnInit() {
    this.authService.redirectAuthenticated();

    this.registrationForm.patchValue({ role: Roles.client });
  }

  public handleSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.loader.showSpinner();
    this.be
      .register(this.registrationForm.value as RegistrationData)
      .subscribe({
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
