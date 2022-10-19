import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginForm: LoginForm = {} as LoginForm;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('marina@i.ua', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('qwertyQ1', [Validators.required]),
    });
  }

  getForm = () => this.loginForm;
}
