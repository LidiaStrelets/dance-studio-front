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
        email: new FormControl('testemail@i.ua', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('hhhhhhH6', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'
          ),
        ]),
        firstname: new FormControl('Name', Validators.required),
        lastname: new FormControl('Lastname', Validators.required),
        role: new FormControl(),
        key: new FormControl(),
      },
      { validators: this.customValidators.keyValidator() }
    );

    this.registrationForm.patchValue({ role: Roles.client });
  }

  getForm = () => this.registrationForm;
}
