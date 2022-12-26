import { FormControl, FormGroup } from '@angular/forms';

export type TRoles = 'admin' | 'client' | 'coach';

export enum Roles {
  admin = 'admin',
  client = 'client',
  coach = 'coach',
}

export interface User {
  birth_date?: string;
  email: string;
  firstname: string;
  id: string;
  information?: string;
  lastname: string;
  photo?: string | null;
  role: TRoles;
}

export interface UserRequest {
  birth_date?: string | null;
  firstname?: string;
  information?: string;
  lastname?: string;
  photo?: string | null | File;
}

export type UserForm = FormGroup<{
  birth_date: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  information: FormControl<string | null>;
}>;

export enum UserFormFields {
  birth_date = 'birth_date',
  firstname = 'firstname',
  lastname = 'lastname',
  information = 'information',
}

export type UserDeletedFields =
  | UserFormFields.birth_date
  | UserFormFields.information
  | 'photo';
