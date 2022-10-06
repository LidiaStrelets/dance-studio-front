import { Component, OnInit } from '@angular/core';
import {
  RegistrationData,
  RegistrationForm,
  Roles,
  TValidationFormFields,
  ValidationFormFields,
} from 'src/types';
import { BeService } from './be.service';
import { RegisterService } from './register.service';

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

  constructor(private formService: RegisterService, private be: BeService) {}

  handleSubmit = () => {
    if (
      Object.keys(this.registrationForm.value).some(
        (key) =>
          !this.registrationForm.get(key)?.value &&
          key !== this.validationFormFields.key
      )
    ) {
      return;
    }

    this.be.register(this.registrationForm.value as RegistrationData).subscribe(
      (res) => console.log('success', res),
      (err) => console.log('error', err)
    );
  };

  ngOnInit() {
    this.registrationForm = this.formService.getForm();
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
