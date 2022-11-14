import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  RegistrationFormFields,
  TRegistrationFormFields,
} from '@authModule/types';
import {
  PersonalFormFields,
  TPersonalFormFields,
} from '@personalsModule/types';
import { ErrorMessages } from '@app/types';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  inputStyles = {
    '--highlight-background': 'none',
  };
  keyInputStyles = {
    color: 'var(--highlight-color-invalid)',
    '--highlight-background': 'var(--highlight-color-invalid)',
    'border-bottom': '1px solid var(--highlight-color-invalid)',
  };

  constructor(private translateService: TranslateService) {}

  getValidation = (
    field: TRegistrationFormFields | TPersonalFormFields,
    form: FormGroup
  ) => {
    if (!form) return;
    const fieldValue = form.get(field);

    return {
      blockHighlight: fieldValue?.invalid && fieldValue?.untouched,
      showMessage: fieldValue?.invalid && fieldValue?.touched,
    };
  };

  getErrors = (
    field: TRegistrationFormFields | TPersonalFormFields,
    form: FormGroup
  ): ErrorMessages => {
    if (!form) return {} as ErrorMessages;
    const fieldValue = form.get(field);
    const errors = fieldValue?.errors;

    const customErrors: ErrorMessages = {} as ErrorMessages;

    if (errors?.['required']) {
      this.translateService
        .get('errors.required')
        .subscribe((res) => (customErrors.required = res));
    }
    if (errors?.['pattern']) {
      if (field === RegistrationFormFields.password) {
        this.translateService
          .get('errors.pattern.password')
          .subscribe((res) => (customErrors.pattern = res));
      }
      if (field === PersonalFormFields.duration) {
        this.translateService
          .get('errors.pattern.duration')
          .subscribe((res) => (customErrors.pattern = res));
      }
    }
    if (errors?.['email']) {
      this.translateService
        .get('errors.email')
        .subscribe((res) => (customErrors.email = res));
    }
    if (errors?.['min']) {
      this.translateService
        .get('errors.min')
        .subscribe((res) => (customErrors.min = res));
    }
    if (errors?.['max']) {
      this.translateService
        .get('errors.max')
        .subscribe((res) => (customErrors.max = res));
    }
    if (
      (field =
        RegistrationFormFields.adminKey &&
        form.errors &&
        form.errors['keyRequired'])
    ) {
      this.translateService
        .get('errors.keyRequired')
        .subscribe((res) => (customErrors.keyRequired = res));
    }

    return customErrors;
  };
}
