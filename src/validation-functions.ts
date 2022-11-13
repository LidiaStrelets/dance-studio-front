import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RegistrationFormFields } from './app/components/auth/types';
import { Roles } from './app/components/user/types';

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  keyValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const role = control.get(RegistrationFormFields.role);
      const key = control.get(RegistrationFormFields.adminKey);

      if (
        (role?.value === Roles.admin || role?.value === Roles.coach) &&
        !key?.value
      ) {
        return { keyRequired: true };
      }

      return null;
    };
  }
}
