import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  keyValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const role = control.get('role');
      const key = control.get('key');

      if ((role?.value === 'admin' || role?.value === 'coach') && !key?.value) {
        return { keyRequired: true };
      }

      return null;
    };
  }
}
