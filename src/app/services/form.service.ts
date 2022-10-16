import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TRegistrationFormFields } from 'src/types';

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

  constructor() {}
  getValidation = (field: TRegistrationFormFields, form: FormGroup) => {
    if (!form) return;
    const fieldValue = form.get(field);

    return {
      blockHighlight: fieldValue?.invalid && fieldValue?.untouched,
      showMessage: fieldValue?.invalid && fieldValue?.touched,
    };
  };

  getErrors = (field: TRegistrationFormFields, form: FormGroup) => {
    if (!form) return;
    const fieldValue = form.get(field);

    return fieldValue?.errors ?? {};
  };
}
