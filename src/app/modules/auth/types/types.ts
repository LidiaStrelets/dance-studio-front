import { FormControl, FormGroup } from '@angular/forms';
import { TRoles } from '@userModule/types/types';

export type LoginForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}>;

export interface LoginData {
  email: string;
  password: string;
}

export type TLoginFormFields = 'email' | 'password';

export enum LoginFormFields {
  email = 'email',
  password = 'password',
}

export type RegistrationForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  role: FormControl<TRoles | null>;
  adminKey: FormControl<string | null>;
}>;

export interface RegistrationData extends LoginData {
  firstname: string;
  lastname: string;
  role: TRoles;
  adminKey?: string;
}

export type TRegistrationFormFields =
  | 'email'
  | 'password'
  | 'firstname'
  | 'lastname'
  | 'role'
  | 'adminKey';

export enum RegistrationFormFields {
  email = 'email',
  password = 'password',
  firstname = 'firstname',
  lastname = 'lastname',
  role = 'role',
  adminKey = 'adminKey',
}

export interface TokenResponce {
  data: { token: string };
}

export interface TokenData {
  id?: string;
  role?: TRoles;
}

export interface StylesObject {
  [key: string]: string;
}
