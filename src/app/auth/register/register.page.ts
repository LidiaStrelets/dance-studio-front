import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/validation-functions';
import {
  RegistrationForm,
  Roles,
  TValidationFormFields,
  ValidationFormFields,
} from 'src/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  roles = [Roles.admin, Roles.client, Roles.coach];
  registrationForm: RegistrationForm = {} as RegistrationForm;
  showForm = false;
  inputStyles = {
    '--highlight-background': 'none',
  };
  keyInputStyles = {
    color: 'var(--highlight-color-invalid)',
    '--highlight-background': 'var(--highlight-color-invalid)',
    'border-bottom': '1px solid var(--highlight-color-invalid)',
  };
  validationFormFields = ValidationFormFields;

  constructor(private customValidators: CustomValidators) {}

  handleSubmit = () => {
    console.log(this.registrationForm.value);
  };

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'
          ),
        ]),
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        role: new FormControl(),
        key: new FormControl(),
      },
      { validators: this.customValidators.keyValidator() }
    );

    this.registrationForm.patchValue({ role: Roles.client });
    this.showForm = true;
  }

  getValidation = (field: TValidationFormFields) => {
    const fieldValue = this.registrationForm.get(field);

    return {
      blockHighlight: fieldValue?.invalid && fieldValue?.untouched,
      showMessage: fieldValue?.invalid && fieldValue?.touched,
    };
  };

  getErrors = (field: TValidationFormFields) => {
    const fieldValue = this.registrationForm.get(field);

    return fieldValue?.errors ?? {};
  };

  showKeyError = () => {
    const key = this.registrationForm.get(this.validationFormFields.key);
    const errors = this.registrationForm.errors;
    if (!errors) {
      return false;
    }

    return key?.touched && errors['keyRequired'];
  };
}
