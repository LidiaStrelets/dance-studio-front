import { FormControl, FormGroup } from '@angular/forms';

export type RegistrationForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  role: FormControl<TRoles | null>;
  key: FormControl<string | null>;
}>;

export interface RegistrationData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: TRoles;
  key?: string;
}

export type TRoles = 'admin' | 'client' | 'coach';

export enum Roles {
  admin = 'admin',
  client = 'client',
  coach = 'coach',
}

export type TValidationFormFields =
  | 'email'
  | 'password'
  | 'firstname'
  | 'lastname'
  | 'role'
  | 'key';

export enum ValidationFormFields {
  email = 'email',
  password = 'password',
  firstname = 'firstname',
  lastname = 'lastname',
  role = 'role',
  key = 'key',
}
