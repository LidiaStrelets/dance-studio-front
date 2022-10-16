import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

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
  key: FormControl<string | null>;
}>;

export interface RegistrationData extends LoginData {
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

export type TRegistrationFormFields =
  | 'email'
  | 'password'
  | 'firstname'
  | 'lastname'
  | 'role'
  | 'key';

export enum RegistrationFormFields {
  email = 'email',
  password = 'password',
  firstname = 'firstname',
  lastname = 'lastname',
  role = 'role',
  key = 'key',
}

export interface TokenResponce {
  data: { token: string };
}

export interface Hall {
  id: string;
  name: string;
  description: string;
  nameUk: string;
  descriptionUk: string;
  polesAmount: number;
  picture: string;
}

export interface TranslatedHall {
  id: string;
  name: string;
  description: string;
  picture: string;
}

export type Languages = 'EN' | 'UK';

export enum ELanguages {
  en = 'EN',
  uk = 'UK',
}

export interface MenuItem {
  name: string;
  translatedName: string;
  link: string[];
}

export enum LocalStorageKeys {
  language = 'language',
  token = 'token',
}

export interface User {
  birth_date?: string;
  email: string;
  firstname: string;
  id: string;
  information?: string;
  lastname: string;
  photo?: string;
  role: TRoles;
}

export interface UserChanges {
  birth_date?: any;
  email?: string;
  firstname?: string;
  id?: string;
  information?: string;
  lastname?: string;
  photo?: string;
}

export interface Error {
  error?: [{ message: string }];
}

export type UserForm = FormGroup<{
  birth_date: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  information: FormControl<string | null>;
  photo: FormControl<string | null>;
}>;

export interface UserData {
  birth_date: string;
  firstname: string;
  lastname: string;
  information: string;
  photo: string;
}

export type ValidationFunction = (
  field: TRegistrationFormFields,
  form: FormGroup
) => {
  blockHighlight: boolean | undefined;
  showMessage: boolean | undefined;
};

export type ErrorFunction = (
  field: TRegistrationFormFields,
  form: FormGroup
) => ValidationErrors;
