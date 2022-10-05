import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/validation-functions';
import { RegistrationForm } from 'src/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  roles = ['admin', 'client', 'coach'];
  registrationForm: RegistrationForm = {} as RegistrationForm;
  showForm = false;
  inputStyles = {
    '--highlight-background': 'none',
  };

  constructor(private customValidators: CustomValidators) {}

  handleSubmit = () => {
    console.log(this.registrationForm);
  };

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.min(8),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}'
          ),
        ]),
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        key: new FormControl(''),
      },
      { validators: this.customValidators.keyValidator() }
    );

    this.showForm = true;
  }
}
