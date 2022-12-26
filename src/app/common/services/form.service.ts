import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  RegistrationFormFields,
  TRegistrationFormFields,
} from '@authModule/types/types';
import {
  PersonalFormFields,
  TPersonalFormFields,
} from '@personalsModule/types/types';
import { ErrorMessages, ReturnErrorMessages } from '@app/common/types/types';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public inputStyles = {
    '--highlight-background': 'none',
  };
  public keyInputStyles = {
    color: 'var(--highlight-color-invalid)',
    '--highlight-background': 'var(--highlight-color-invalid)',
    'border-bottom': '1px solid var(--highlight-color-invalid)',
  };

  constructor(private translateService: TranslateService) {}

  public getValidation(
    field: TRegistrationFormFields | TPersonalFormFields,
    form: FormGroup
  ) {
    if (!form) return;
    const fieldValue = form.get(field);

    return {
      blockHighlight: fieldValue?.invalid && fieldValue?.untouched,
      showMessage: fieldValue?.invalid && fieldValue?.touched,
    };
  }

  public getErrors(
    field: TRegistrationFormFields | TPersonalFormFields,
    form: FormGroup
  ): ReturnErrorMessages {
    if (!form) return {} as ReturnErrorMessages;
    const fieldValue = form.get(field);
    const errors = fieldValue?.errors;

    const returnErrors: ReturnErrorMessages = {} as ReturnErrorMessages;

    return returnErrors;
  }
}
