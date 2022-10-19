import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { CustomValidators } from 'src/validation-functions';
import { AuthService } from '../../services/auth.service';
import { BeService } from '../../services/register.services/be.service';

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
    private alertService: AlertService,
    private authService: AuthService,
    private errorService: ErrorService,
    private formFunctionsServise: FormService
  ) {}

  handleSubmit = () => {
    if (this.registrationForm.invalid || !this.registrationForm.dirty) {
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
    this.registrationForm = new FormGroup(
      {
        email: new FormControl('marina@i.ua', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('qwertyQ1', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'
          ),
        ]),
        firstname: new FormControl('Marina', Validators.required),
        lastname: new FormControl('Gerasimenia', Validators.required),
        role: new FormControl(),
        adminKey: new FormControl('x0E7q04QJa3o'),
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
