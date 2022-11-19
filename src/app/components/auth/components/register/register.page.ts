import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { routesPaths } from 'src/app/app-routing.module';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';
import {
  RegistrationData,
  RegistrationForm,
  RegistrationFormFields,
} from '@authModule/types';
import { CustomValidators } from '@root/validation-functions';
import { AuthService } from '@authModule/services/auth.service';
import { BeService } from '@authModule/services/register.services/be.service';
import { Roles } from '@userModule/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  roles = [Roles.admin, Roles.client, Roles.coach];

  registrationFormFields = RegistrationFormFields;
  registrationForm: RegistrationForm = {} as RegistrationForm;

  routerLink = ['../', routesPaths.login];

  constructor(
    private customValidators: CustomValidators,
    private be: BeService,
    private authService: AuthService,
    private formFunctionsServise: FormService,
    private loader: LoaderService
  ) {}

  handleSubmit = () => {
    if (this.registrationForm.invalid) {
      return;
    }
    this.loader.showSpinner();
    this.be
      .register(this.registrationForm.value as RegistrationData)
      .subscribe({
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
    this.registrationForm = new FormGroup(
      {
        [RegistrationFormFields.email]: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        [RegistrationFormFields.password]: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'
          ),
        ]),
        [RegistrationFormFields.firstname]: new FormControl(
          '',
          Validators.required
        ),
        [RegistrationFormFields.lastname]: new FormControl(
          '',
          Validators.required
        ),
        [RegistrationFormFields.role]: new FormControl(),
        [RegistrationFormFields.adminKey]: new FormControl(''),
      },
      { validators: this.customValidators.keyValidator() }
    );

    this.registrationForm.patchValue({ role: Roles.client });
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
