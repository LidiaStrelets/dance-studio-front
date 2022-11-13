import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export type TRoles = 'admin' | 'client' | 'coach';

export enum Roles {
  admin = 'admin',
  client = 'client',
  coach = 'coach',
}

export interface User {
  birth_date?: Date;
  email: string;
  firstname: string;
  id: string;
  information?: string;
  lastname: string;
  photo?: string | null;
  role: TRoles;
}

export interface UserRequest {
  birth_date?: Date | null;
  firstname?: string;
  information?: string;
  lastname?: string;
  photo?: string | null;
}

export type UserForm = FormGroup<{
  birth_date: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  information: FormControl<string | null>;
  photo: FormControl<File | null>;
}>;

export enum UserFormFields {
  birth_date = 'birth_date',
  firstname = 'firstname',
  lastname = 'lastname',
  information = 'information',
  photo = 'photo',
}

export type UserDeletedFields =
  | UserFormFields.birth_date
  | UserFormFields.information
  | UserFormFields.photo;
