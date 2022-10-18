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
  adminKey: FormControl<string | null>;
}>;

export interface RegistrationData extends LoginData {
  firstname: string;
  lastname: string;
  role: TRoles;
  adminKey?: string;
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
  photo?: string | null;
  role: TRoles;
}

export interface Error {
  error?: [{ message: string }];
}

export type UserForm = FormGroup<{
  birth_date: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  information: FormControl<string | null>;
  photo: FormControl<File | null>;
}>;

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

export interface AlertTranslation {
  oopsHeader: string;
  okButton: string;
  completedHeader: string;
  unauthorizedHeader: string;
  unauthorizedMesage: string;
  userSuccessMessage: string;
  serverErrorMessage: string;
}

export enum EAlertTranslation {
  oopsHeader = 'oopsHeader',
  okButton = 'okButton',
  completedHeader = 'completedHeader',
  unauthorizedHeader = 'unauthorizedHeader',
  unauthorizedMesage = 'unauthorizedMesage',
  userSuccessMessage = 'userSuccessMessage',
  serverErrorMessage = 'serverErrorMessage',
}
