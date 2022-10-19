import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationForm, Roles } from 'src/types';
import { CustomValidators } from 'src/validation-functions';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registrationForm: RegistrationForm = {} as RegistrationForm;

  constructor(private customValidators: CustomValidators) {
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

  getForm = () => this.registrationForm;
}
